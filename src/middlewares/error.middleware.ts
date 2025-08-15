import { Request, Response, NextFunction } from 'express';

interface ErrorResponse extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};
