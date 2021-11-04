import fetch from 'node-fetch';

export class Facts {
  constructor(private language: string) {}

  public async lookup() {
    const data = await (await fetch(`https://uselessfacts.jsph.pl/random.json?language=${this.language}`)).json();

    return {
      text: data?.text,
      source: {
        name: data?.source,
        url: data?.source_url,
      },
    };
  }
}

export default Facts;
