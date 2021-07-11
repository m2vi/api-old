// @ts-ignore
import ytch from 'yt-channel-info';

export class YouTube {
  constructor(private id: string) {}

  async lookup() {
    return await ytch.getChannelInfo(this.id, '0');
  }
}

export default YouTube;
