import { Discord } from './discord';
import { GitHub } from './github';
import { Instagram } from './instagram';
import { Ip } from './ip';
import { Mojang } from './mojang';
import { Reddit } from './reddit';
import { ScoreSaber } from './scoresaber';
import { Steam } from './steam';
import { YouTube } from './youtube';
import { e } from '../utils/error';

export const g = (options: any, key: string, Default: any) => {
  try {
    return options[key];
  } catch (error) {
    return Default;
  }
};

export const services = [
  Discord,
  GitHub,
  Instagram,
  Ip,
  Mojang,
  Reddit,
  ScoreSaber,
  Steam,
  YouTube,
].map((service) => ({
  name: service.name,
  c: service,
}));

export interface GetResponseProps {
  service: string;
  id: string;
  options: any;
}

export const getResponse = async ({
  service,
  id,
  options,
}: GetResponseProps) => {
  for (const curr of services) {
    if (curr.name.toLowerCase() !== service.toLowerCase()) continue;

    const res = await new curr.c(id, options).lookup();

    return res;
  }

  return e(undefined, 400, 'The provided service does not exist.', {
    include_docs: true,
  });
};
