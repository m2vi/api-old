export interface DiscordResProps {
  // success
  id?: string;
  username?: string;
  avatar?: string;
  discriminator?: string;
  public_flags?: number;
  banner?: null | any;
  banner_color?: null | any;
  accent_color?: null | any;
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
    key: string;
    url: string;
  };
  banner?: {
    url?: string;
    key?: string;
    color?: string;
  };
}
