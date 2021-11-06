import fetch from 'node-fetch';

export class Mojang {
  #baseUrl: string;
  constructor(private user: string) {
    this.#baseUrl = 'https://api.mojang.com';
  }

  private async fetcher(path: string) {
    return await (await fetch(`${this.#baseUrl}${path}`)).json();
  }

  public isUUID() {
    const regExp = new RegExp('[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}');
    return regExp.test(this.user);
  }

  public async getUUID() {
    return (await this.fetcher(`/users/profiles/minecraft/${this.user}`)).id;
  }

  public async getNames(uuid: string) {
    return await this.fetcher(`/user/profiles/${uuid}/names`);
  }

  public async lookup() {
    const uuid = this.isUUID() ? this.user : await this.getUUID();
    const names = await this.getNames(uuid);

    return {
      uuid,
      name: names[names.length - 1]?.name,
      names,
    };
  }
}

export default Mojang;
