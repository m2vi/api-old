import validator from 'validator';
import fetch from 'node-fetch';
import { isPrivate, isV4Format, isV6Format } from 'ip';

export class Ip {
  constructor(private ip: string) {}

  public async lookup() {
    if (!validator.isIP(this.ip)) {
      return {
        success: false,
        message: 'IP is not valid',
      };
    }
    const req = await fetch(
      `http://ip-api.com/json/${this.ip}?fields=66121727`
    );
    const json = await req.json();

    return {
      success: true,
      query: this.ip,
      ip: {
        isV4: isV4Format(this.ip),
        isV6: isV6Format(this.ip),
        isPrivate: isPrivate(this.ip),
      },
      asn: {
        as: json.as,
        asname: json.asname,
        isp: json.isp,
        org: json.org,
      },
      security: {
        hosting: false,
        proxy: false,
        tor: false,
        vpn: false,
      },
      location: {
        city: json.city,
        country: json.country,
        currency: json.currency,
        lat: json.lat,
        lon: json.lon,
        postal: json.zip,
        region: json.regionName,
        timezone: json.timezone,
      },
    };
  }
}

export default Ip;
