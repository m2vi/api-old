import fetch from 'node-fetch';
import { e } from '../utils/error';

export class YouTube {
  #baseUrl: string;
  #key: string;

  constructor(private id: string) {
    this.#baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    this.#key = process.env.openWeather;
  }

  private async fetcher() {
    const url = `${this.#baseUrl}/?q=${this.id}&appid=${this.#key}`;

    const json = (await fetch(url)).json();
    return json;
  }

  public async lookup() {
    try {
      return await this.fetcher();
    } catch (error) {
      return e(undefined, 400, error.message);
    }
  }
}

export default YouTube;
