import fetch, { Headers } from 'node-fetch';

export class TrackerGG {
  constructor(private game: string, private platform: string, private id: string) {}

  private async fetcher(game: string, platform: string, id: string) {
    return await (
      await fetch(`https://public-api.tracker.gg/v2/${game}/standard/profile/${platform}/${id}`, {
        headers: new Headers({
          'TRN-Api-Key': process.env.TRN_API_KEY,
        }),
      })
    ).json();
  }

  public async lookup() {
    if (!(this.game && this.platform && this.id)) throw Error('Missing param(s)');
    if (!process.env.TRN_API_KEY) throw Error('Missing environment variable');
    return await this.fetcher(this.game, this.platform, this.id);
  }
}

export default TrackerGG;
