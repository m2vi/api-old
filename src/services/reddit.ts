import fetch from 'node-fetch';

export class Reddit {
  constructor(private user: string) {}

  async lookup() {
    const req = await fetch(
      `https://www.reddit.com/user/${this.user}/about.json`
    );
    return await req.json();
  }
}
