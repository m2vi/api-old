import fetch from 'node-fetch';
import { GetAllProps } from './types/github';

export class GitHub {
  #baseUrl: string;

  constructor(private user: string) {
    this.#baseUrl = 'https://api.github.com';
  }

  private async fetcher(path: string) {
    const headers = {
      Authorization: `Authorization: token ${process.env.GitHubPAT}`,
    };

    const req = await fetch(new URL(path, this.#baseUrl).href, { headers });
    const json = await req.json();

    return json;
  }

  public async repos() {
    return await this.fetcher(`/users/${this.user}/repos`);
  }

  public async repo(repository: string) {
    return await this.fetcher(`/repos/${this.user}/${repository}`);
  }

  public async details() {
    return await this.fetcher(`/users/${this.user}`);
  }

  public async lookup(): Promise<GetAllProps> {
    return {
      query: this.user,
      repos: await this.repos(),
      details: await this.details(),
    };
  }
}

export default GitHub;
