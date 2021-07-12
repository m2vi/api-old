import { Response } from 'express';
import { docs } from './constants';

export interface ErrorOptionsProps {
  include_docs?: boolean;
}

export const e = (
  res: Response,
  code?: number,
  message?: string,
  options?: ErrorOptionsProps
) => {
  if (!res && code) {
    return {
      success: false,
      code,
      message,
      docs: options.include_docs && docs,
    };
  }

  if (!code) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: 'Internal Server Error',
      error: message,
    });
  }
  res.status(code).json({
    success: false,
    code,
    message,
    docs: options.include_docs && docs,
  });
};
