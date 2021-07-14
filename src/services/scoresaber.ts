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
  success: boolean;
  playerInfo: PlayerInfo;
  scoreStats: ScoreStats;
  scores: Score[];
  error:
    | {
        message: string;
      }
    | string;
}

export interface Score {
  scoreId: number;
  leaderboardId: number;
  score: number;
  uScore: number;
  mods: string;
  playerId: string;
  timeset: string;
  pp: number;
  weight: number;
  id: string;
  name: string;
  songSubName: string;
  songAuthorName: string;
  levelAuthorName: string;
  diff: string;
  maxScoreEx: number;
  rank: number;
}

export interface ScoreReply {
  scores: Score[];
}

export enum ScoreOrder {
  TOP,
  RECENT,
}

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
