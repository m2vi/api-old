import fetch from 'node-fetch';

export class Mojang {
  #baseUrl: string;
  constructor(private user: string) {
    this.#baseUrl = 'https://api.mojang.com';
  }

  async fetcher(path: string) {
    return await (await fetch(`${this.#baseUrl}${path}`)).json();
  }

  async getUUID() {
    return (await this.fetcher(`/users/profiles/minecraft/${this.user}`)).id;
  }

  async getNames(uuid: string) {
    return await this.fetcher(`/user/profiles/${uuid}/names`);
  }

  async lookup() {
    const uuid = await this.getUUID();

    return {
      uuid,
      name: this.user,
      names: await this.getNames(uuid),
    };
  }
}

export default Mojang;
