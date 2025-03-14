import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  switch (true) {
    case typeof err === 'string': {
      const is404 = err.toLowerCase().endsWith('not found');
      const statusCode = is404 ? 404 : 400;
      res.status(statusCode).json({ message: err });
      return;
    }
    default: {
      const message = err.message || 'Internal Server Error';
      res.status(500).json({ message });
      return;
    }
  }
}