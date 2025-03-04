import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ErrorResponse = {
    message: err.message || 'Erreur serveur',
    status: 500,
  };

  if (process.env.NODE_ENV === 'development') {
    error.stack = err.stack;
  }

  res.status(error.status).json(error);
};
