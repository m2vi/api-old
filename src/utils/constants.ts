export const docs: string =
  'https://github.com/m2vi/lookup/blob/main/README.md';
export const activeServices: string[] = [
  'discord',
  'github',
  'instagram',
  'ip',
  'mojang',
  'reddit',
  'scoresaber',
  'steam',
  'youtube',
  'weather',
];
export const sortByKey = (array: any[], key?: string) => {
  if (array && key) {
    return array.sort((a, b) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    );
  } else {
    return array.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));
  }
};
