import fetch from 'node-fetch';
import { matchSorter } from 'match-sorter';
// @ts-ignore
import PornHub2 from 'pornhub.js';

const pornhub = new PornHub2();
export class PornHub {
  constructor(private user: string) {}

  async lookup() {
    // const all = await pornhub.webMaster.getPornstarsDetail();
    // const results = matchSorter(all, this.user, { keys: ['star_name'] });
    // return results;
    return {};
  }
}
