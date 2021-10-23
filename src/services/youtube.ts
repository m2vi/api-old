// @ts-ignore
import ytch from 'yt-channel-info';
import { e } from '../utils/error';

export class YouTube {
  constructor(private id: string) {}

  public async lookup() {
    try {
      return await ytch.getChannelInfo(this.id, '0');
    } catch (error) {
      return e(undefined, 400, error.message);
    }
  }
}

export default YouTube;
