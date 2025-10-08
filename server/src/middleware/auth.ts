import { Request, Response, NextFunction } from 'express';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const password = req.headers['x-admin-password'] as string;

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
