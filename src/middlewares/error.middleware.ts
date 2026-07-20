import { AppError } from '../utils/appError';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.log(err);

  const statusCode = err instanceof AppError ? err.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err instanceof Error ? err.message : 'Internal Server Error',
  });
};
