import fetch from 'node-fetch';
import { Player, Score } from './types/scoresaber';

export class ScoreSaber {
  baseUrl: string;
  constructor(private id: string) {
    this.baseUrl = 'https://new.scoresaber.com/api';
  }

  private async fetcher(path: string) {
    const data = await fetch(`${this.baseUrl}${path}`);
    const json = await data.json();

    return json;
  }

  public async getAllScores(totalPlayCount: number) {
    const pages = Math.ceil(totalPlayCount / 8);
    const scores: Score[] = [];

    for (let i = 1; i <= pages; i++) {
      try {
        const data = await this.fetcher(`/player/${this.id}/scores/top/${i}`);
        scores.push(...data.scores);
      } catch (err) {
        return err.message;
      }
    }

    return scores;
  }

  private async reformat(json: Player): Promise<Player> {
    if (json.error) {
      json.success = false;
      json.error = (json.error as any).message;
      return json;
    }

    const scores = await this.getAllScores(json.scoreStats.totalPlayCount);

    json.scores = scores;
    json.success = true;
    json.playerInfo.avatar =
      'https://new.scoresaber.com' + json.playerInfo.avatar;

    return json;
  }

  public async lookup(): Promise<Player> {
    const data = await this.fetcher(`/player/${this.id}/full`);

    return this.reformat(data);
  }
}

export default ScoreSaber;
