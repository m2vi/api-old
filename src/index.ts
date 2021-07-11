import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import isJSON from '@stdlib/assert-is-json';

import { getDataz } from './services';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.get('/api', async (_: Request, res: Response) => {
  try {
    const { service, u, options } = _.query;

    const dataz = await getDataz({
      service: service.toString(),
      u: u.toString(),
      options: isJSON(options) ? JSON.parse(options.toString()) : null,
    });

    res.status(200).json(dataz);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Bad Request', error: error.message });
  }
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
