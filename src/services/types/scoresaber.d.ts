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
