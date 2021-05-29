import { NextApiRequest, NextApiResponse } from 'next';
import { lookup } from '../../lookup/discord';

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const { id } = _.query;

  const req = await lookup(id ? id.toString() : '0');

  res.status(200).json(req);
};
