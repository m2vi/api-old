import fetch from 'node-fetch';
import { DiscordResProps, FormatedProps } from './types/discord';

export class Discord {
  constructor(private id: string) {}

  private reformat(props: DiscordResProps): FormatedProps {
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

    const {
      id,
      username,
      avatar,
      discriminator,
      public_flags,
      bot,
      banner,
      banner_color,
      accent_color,
    } = props;

    return {
      success,
      code: 200,
      bot: bot ? true : false,
      id,
      username,
      discriminator,
      creationDate: this.convertIdtoTimestamp(),
      flags: public_flags,
      avatar: {
        url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=1024`,
        key: avatar,
      },
      banner: {
        url: `https://cdn.discordapp.com/banners/${id}/${banner}.png?size=512`,
        key: banner,
        color: banner_color,
      },
    };
  }

  public async lookup() {
    const baseUrl = 'https://discord.com/api/';
    const { discordToken } = process.env;

    const headers = {
      Authorization: `Bot ${discordToken}`,
    };

    const req = await fetch(`${baseUrl}/users/${this.id}`, {
      method: 'GET',
      headers,
    });

    const json: DiscordResProps = await req.json();

    return this.reformat(json);
  }

  private convertIdtoTimestamp() {
    const bin = (+this.id).toString(2);
    const m = 64 - bin.length;
    const unixbin = bin.substring(0, 42 - m).toString();
    const timestamp = parseInt(unixbin, 2) + 1420070400000;
    return timestamp;
  }
}

export default Discord;
