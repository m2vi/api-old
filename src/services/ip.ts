import validator from 'validator';
import fetch from 'node-fetch';
import { isPrivate, isV4Format, isV6Format } from 'ip';

export class Ip {
  constructor(private ip: string) {}

  public async lookup() {
    if (!validator.isIP(this.ip)) {
      return {
        error: 'IP is not valid',
      };
    }
    const req = await fetch(`https://vpnapi.io/api/${this.ip}?key=${process.env.ipToken}`);
    const json = await req.json();

    return json;
  }
}

export default Ip;
