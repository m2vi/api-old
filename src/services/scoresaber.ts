import fetch from 'node-fetch';
import { Player } from './types/scoresaber';

export class ScoreSaber {
  baseUrl: string;
  constructor(private id: string) {
    this.baseUrl = 'https://new.scoresaber.com/api';
  }

  private async reformat(json: Player): Promise<Player> {
    if (json.error) {
      json.success = false;
      json.error = (json.error as any).message;
      return json;
    }

    json.success = true;
    json.playerInfo.avatar =
      'https://new.scoresaber.com' + json.playerInfo.avatar;

    return json;
  }

  async lookup(): Promise<Player> {
    const res = await (
      await fetch(`${this.baseUrl}/player/${this.id}/full`)
    ).json();

    return this.reformat(res);
  }
}

export default ScoreSaber;
