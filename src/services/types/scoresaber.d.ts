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
