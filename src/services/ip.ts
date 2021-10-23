import validator from 'validator';
import fetch from 'node-fetch';
import { isPrivate, isV4Format, isV6Format } from 'ip';

export class Ip {
  constructor(private ip: string) {}

  public async lookup() {
    const { ip } = this;

    if (!validator.isIP(ip)) {
      return {
        error: 'IP is not valid',
      };
    }

    const ipapi = await (await fetch(`http://ip-api.com/json/${ip}?fields=66691071`)).json(); // with reverse (without: 66686975, delay: ≈150ms)
    const vpnapi = await (await fetch(`https://vpnapi.io/api/${ip}?key=${process.env.ipToken}`)).json();

    return {
      query: ip,
      security: {
        vpn: vpnapi?.security?.vpn,
        proxy: vpnapi?.security?.proxy,
        tor: vpnapi?.security?.tor,
        hosting: ipapi?.hosting,
        mobile: ipapi?.mobile,
      },
      location: {
        continent: ipapi?.continent,
        continentCode: ipapi?.continentCode,
        country: ipapi?.country,
        countryCode: ipapi?.countryCode,
        region: ipapi?.region,
        regionName: ipapi?.regionName,
        city: ipapi?.city,
        district: ipapi?.district,
        zip: ipapi?.zip,
        latitude: ipapi?.lat,
        longitude: ipapi?.lon,
        timezone: ipapi?.timezone,
        localeCode: vpnapi?.locale_code,
        offset: Math.floor(ipapi?.offset / 3600),
        currency: ipapi?.currency,
        metroCode: vpnapi?.metro_code,
        europeanUnion: vpnapi?.is_in_european_union,
      },
      network: {
        route: vpnapi?.network?.network,
        as: ipapi?.as,
        asn: vpnapi?.network?.autonomous_system_number,
        isp: ipapi?.isp,
        org: ipapi?.org,

        asname: ipapi?.asname,
        reverse: ipapi?.reverse,
      },
    };
  }
}

export default Ip;
