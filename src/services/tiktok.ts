import { getUserProfileInfo } from 'tiktok-scraper';

export class TikTok {
  constructor(private user: string) {}

  public async lookup() {
    return await getUserProfileInfo(this.user);
  }
}

export default TikTok;
