import moment from 'moment';
import fetch from 'node-fetch';
import { g } from '.';

export interface DiscordResProps {
  // success
  id?: string;
  username?: string;
  avatar?: string;
  discriminator?: string;
  public_flags?: number;
  bot?: boolean;

  // fail
  message?: string;
  code?: number;
  User_id?: string;
}

export interface FormatedProps {
  success: boolean;
  message?: string;
  code?: number;
  User_id?: string;
  bot?: boolean;
  id?: string;
  username?: string;
  discriminator?: string;
  flags?: number;
  creationDate?: any;
  avatar?: {
    url: string;
    key: string;
  };
}

export interface DiscordOptionProps {
  avatarSize: string;
  momementFormat: string;
  format: boolean;
}

export class Discord {
  constructor(private id: string, private options: DiscordOptionProps) {}

  reformat(props: DiscordResProps): FormatedProps {
    const { message, code, user_id } = props as any;

    const success = message && code ? false : true;

    if (success === false) {
      return {
        success,
        message,
        code,
      };
    }

    if (user_id) {
      return {
        success: false,
        message: user_id,
      };
    }

    const { id, username, avatar, discriminator, public_flags, bot } = props;

    return {
      success,
      code: 200,
      bot: bot ? true : false,
      id,
      username,
      discriminator,
      creationDate: this.convertIdtoTimestamp(
        g(this.options, 'momentFormat', 'M.D.YYYY')
      ),
      flags: public_flags,
      avatar: {
        url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=${g(
          this.options,
          'avatarSize',
          '1024'
        )}`,
        key: avatar,
      },
    };
  }

  async lookup() {
    const baseUrl = 'https://discord.com/api';
    const { discordToken } = process.env;

    const headers = {
      Authorization: `Bot ${discordToken}`,
    };

    const req = await fetch(`${baseUrl}/users/${this.id}`, {
      method: 'GET',
      headers,
    });

    const json: DiscordResProps = await req.json();

    return g(this.options, 'format', true) === false
      ? json
      : this.reformat(json);
  }

  convertIdtoTimestamp(momentFormat: string) {
    const bin = (+this.id).toString(2);
    const m = 64 - bin.length;
    const unixbin = bin.substring(0, 42 - m).toString();
    const timestamp = parseInt(unixbin, 2) + 1420070400000;
    return {
      time: timestamp,
      formated: moment(timestamp).format(momentFormat),
    };
  }
}

export default Discord;
