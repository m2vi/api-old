// @ts-ignore
import userInstagram from 'user-instagram';
import { InstagramProps } from './types/instagram';

export class Instagram {
  constructor(private u: string) {}

  async lookup(): Promise<InstagramProps> {
    return await (userInstagram as any).getUserData(this.u);
  }
}

export default Instagram;
