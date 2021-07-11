import fetch from 'node-fetch';

export class PornHub {
  constructor(private user: string) {}

  async lookup() {
    const req = await fetch(
      `https://www.reddit.com/user/${this.user}/about.json`
    );
    return await req.json();
  }
}
