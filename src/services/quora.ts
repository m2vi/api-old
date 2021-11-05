// @ts-ignore
import quora from 'quora-data-scraper';

export class Quora {
  constructor(private user: string) {}

  public async lookup() {
    return await quora.fetchUser(`https://en.quora.com/profile/${encodeURIComponent(this.user)}`);
  }
}

export default Quora;
