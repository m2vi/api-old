import { activeServices, docs } from './utils/constants';
import express, { Request, Response } from 'express';

import apicache from 'apicache';
import dotenv from 'dotenv';
import { e } from './utils/error';
import { getResponse } from './services';
import isJSON from '@stdlib/assert-is-json';
import requestIp from 'request-ip';

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

dotenv.config();

const app = express();
const cache = apicache.middleware;
const port = process.env.SERVER_PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'asp.net');
  next();
});

app.get('/', async (_: Request, res: Response) => {
  try {
    return res.status(200).json({
      message: `Welcome to my Express API! If you don't know what you're doing, check out the documentation.`,
      docs,
    });
  } catch (err) {
    return e(res, undefined, err);
  }
});

app.get('/:service', async (_: Request, res: Response) => {
  if (_.params.service === 'ip') {
    res.status(200).json({
      ip: requestIp.getClientIp(_),
    });
  } else {
    try {
      const { service } = _.params;
      if (service.toString().toLowerCase() === 'list') {
        return res.json({ success: true, services: activeServices });
      }
      return e(res, 400, 'No id provided', { include_docs: true });
    } catch (err) {
      return e(res, undefined, err);
    }
  }
});

app.get('/:service/:id', cache('10 minutes'), async (_: Request, res: Response) => {
  try {
    const { options } = _.query;
    const { service, id } = _.params;

    if (options && !isJSON(options)) {
      return e(res, 400, 'The given options are not parsable. Only JSON is supported.', {
        include_docs: true,
      });
    }

    const response = await getResponse({
      service: service.toString().toLowerCase(),
      id: id.toString(),
      options: isJSON(options) ? JSON.parse(options.toString()) : null,
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.info(`Server started at http://localhost:${port}`);
});
