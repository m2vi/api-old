import { Discord } from './discord';
import { GitHub } from './github';
import { Instagram } from './instagram';
import { Ip } from './ip';
import { Reddit } from './reddit';
import { ScoreSaber } from './scoresaber';
import { Steam } from './steam';
import { YouTube } from './youtube';

export const g = (options: any, key: string, Default: any) => {
  try {
    return options[key];
  } catch (error) {
    return Default;
  }
};

export const services = [
  {
    name: Discord.name,
    c: Discord,
  },
  {
    name: GitHub.name,
    c: GitHub,
  },
  {
    name: Instagram.name,
    c: Instagram,
  },
  {
    name: Ip.name,
    c: Ip,
  },
  {
    name: Reddit.name,
    c: Reddit,
  },
  {
    name: ScoreSaber.name,
    c: ScoreSaber,
  },
  {
    name: Steam.name,
    c: Steam,
  },
  {
    name: YouTube.name,
    c: YouTube,
  },
];

export interface GetDatazProps {
  service: string;
  u: string;
  options: any;
}

export const getDataz = async ({ service, u, options }: GetDatazProps) => {
  for (const curr of services) {
    if (curr.name.toLowerCase() !== service.toLowerCase()) continue;

    return await new curr.c(u, options).lookup();
  }
};
