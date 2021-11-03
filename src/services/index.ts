import { e } from '../utils/error';
import { activeServices } from '../utils/constants';
import { GetResponseProps } from './types/index';

export const g = (options: any, key: string, Default: any) => {
  try {
    return options[key];
  } catch (error) {
    return Default;
  }
};

export const getResponse = async ({ service, id, options }: GetResponseProps) => {
  if (!activeServices.includes(service)) {
    return e(undefined, 400, 'The provided server does not exist or is deactivated.', {
      include_docs: true,
    });
  }

  const { default: c } = await import(`./${service}`);

  if (c) {
    try {
      const data = await new c(id, options).lookup();
      return data;
    } catch (err) {
      console.error(err);
      return e(undefined, 500, 'Something went wrong');
    }
  }

  return e(undefined, 400, 'The provided service does not exist.', {
    include_docs: true,
  });
};
