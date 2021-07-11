// @ts-ignore
import userInstagram from 'user-instagram';

export class Instagram {
  constructor(private u: string) {}

  async lookup() {
    return await (userInstagram as any).getUserData(this.u);
  }
}
