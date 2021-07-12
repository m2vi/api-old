import { Response } from 'express';
import { docs } from './constants';

export interface ErrorOptionsProps {
  include_docs: boolean;
}

export const e = (
  res: Response,
  code: number,
  message: string,
  options?: ErrorOptionsProps
) => {
  res.status(code).json({
    success: false,
    code,
    message,
    docs: options.include_docs && docs,
  });
};
