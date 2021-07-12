import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import isJSON from '@stdlib/assert-is-json';
import rateLimit from 'express-rate-limit';
import { e } from './utils/error';
import { getDataz } from './services';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

const limiter = rateLimit({
  windowMs: 1000 * 60 * 60, // 1h
  max: 600,
  message: 'Too many requests from this IP, please try again later',
});

app.use(limiter);

app.get('/', async (_: Request, res: Response) => {
  try {
    const { service, u, options } = _.query;

    if (!(u && service)) {
      return e(res, 400, 'Missing Params', { include_docs: true });
    } else if (!u) {
      return e(res, 400, 'Missing Param (User)');
    } else if (!service) {
      return e(res, 400, 'Missing Param (Service)');
    } else if (options && !isJSON(options)) {
      return e(
        res,
        400,
        'The given options are not parsable. Only JSON is supported.',
        {
          include_docs: true,
        }
      );
    }

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
  console.log(`Server started at http://localhost:${port}`);
});
