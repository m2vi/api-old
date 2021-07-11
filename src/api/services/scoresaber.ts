import fetch from 'node-fetch';

export interface Badge {
  image: string;
  description: string;
}

export interface PlayerInfo {
  playerId: string;
  pp: number;
  banned: boolean;
  inactive: boolean;
  name: string;
  country: string;
  role: string;
  badges: Badge[];
  history: string;
  avatar: string;
  rank: number;
  countryRank: number;
}

export interface ScoreStats {
  totalScore: number;
  totalRankedScore: number;
  averageRankedAccuracy: number;
  totalPlayCount: number;
  rankedPlayCount: number;
}

export interface Player {
  playerInfo: PlayerInfo;
  scoreStats: ScoreStats;
}

export class ScoreSaber {
  baseUrl: string;
  constructor(private id: string) {
    this.baseUrl = 'https://new.scoresaber.com/api';
  }

  async reformat(json: Player): Promise<Player> {
    json.playerInfo.avatar =
      'https://new.scoresaber.com' + json.playerInfo.avatar;

    return json;
  }

  async lookup(): Promise<Player> {
    // Haha looks cool
    return await this.reformat(
      await (await fetch(`${this.baseUrl}/player/${this.id}/full`)).json()
    );
  }
}
