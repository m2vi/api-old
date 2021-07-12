import { response } from 'express';
import fetch from 'node-fetch';
// import dotenv from 'dotenv';
// dotenv.config();

interface UrlParams {
  name: string;
  value: string;
}

export class Steam {
  baseUrl: string;
  key: string;
  constructor(private u: string) {
    this.baseUrl = 'http://api.steampowered.com';
    this.key = process.env.steamKey;
  }

  async fetcher(path: string, params?: UrlParams[]) {
    const url = new URL(`${this.baseUrl}${path}?key=${this.key}&format=json`);

    if (params) {
      for (const { name, value } of params) {
        url.searchParams.append(name, value);
      }
    }

    try {
      return await (await fetch(url.toString())).json();
    } catch (error) {
      return {
        error: 'Profile is not public',
        success: false,
      };
    }
  }

  async getPlayerSummaries(id?: string) {
    const summaries = await this.fetcher(
      '/ISteamUser/GetPlayerSummaries/v0002/',
      [{ name: 'steamids', value: id || this.u }]
    );

    const profilestates = [
      'Offline',
      'Online',
      'Busy',
      'Away',
      'Snooze',
      'looking to trade',
      'looking to play',
    ];

    const communityvisibilitystates = ['Private', '', 'Public'];

    return summaries;
  }

  async getFriendList() {
    const friendListBefore = (
      await this.fetcher('/ISteamUser/GetFriendList/v0001/', [
        { name: 'steamid', value: this.u },
      ])
    )?.friendslist?.friends;

    if (!friendListBefore)
      return {
        error: 'Profile is not public',
        success: false,
      };

    return await Promise.all(
      friendListBefore.map(async (friend: any) => {
        const friendInfo = (await this.getPlayerSummaries(friend.steamid))
          .response.players[0];
        friendInfo.relationship = friend.relationship;
        friendInfo.friend_since = friend.friend_since;

        return friendInfo;
      })
    );
  }

  async getOwnedGames() {
    const { game_count, games } = (
      await this.fetcher('/IPlayerService/GetOwnedGames/v0001/', [
        { name: 'steamid', value: this.u },
        { name: 'include_appinfo', value: 'true' },
        { name: 'include_played_free_games', value: 'true' },
      ])
    ).response;

    const reGames = await Promise.all(
      games.map(async (game: any) => {
        const achievements = await this.getPlayerAchievements(game.appid);

        const stats = await this.getUserStatsFromGame(game.appid);

        game.achievements = achievements;
        game.stats = stats;

        return game;
      })
    );

    return [game_count, reGames];
  }

  async getPlayerAchievements(appid: string) {
    return (
      await this.fetcher('/ISteamUserStats/GetPlayerAchievements/v0001/', [
        { name: 'steamid', value: this.u },
        { name: 'appid', value: appid },
      ])
    ).playerstats;
  }

  async getUserStatsFromGame(appid: string) {
    return await this.fetcher('/ISteamUserStats/GetUserStatsForGame/v2/', [
      { name: 'steamid', value: this.u },
      { name: 'appid', value: appid },
    ]);
  }

  async getRecentlyPlayedGames() {
    return await this.fetcher('/IPlayerService/GetOwnedGames/v0001/', [
      { name: 'steamid', value: this.u },
    ]);
  }

  async lookup() {
    const summaries = await this.getPlayerSummaries();

    if (summaries.response.players.length <= 0) {
      return {
        success: false,
        message: 'User does not exist',
      };
    } else {
      return {
        success: true,
        playerSummaries: (await this.getPlayerSummaries()).response.players[0],
        friendList: await this.getFriendList(),
        games: await this.getOwnedGames(),
      };
    }
  }
}

// Docs: https://developer.valvesoftware.com/wiki/Steam_Web_API
