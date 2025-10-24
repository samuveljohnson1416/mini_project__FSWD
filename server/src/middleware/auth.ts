import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'No authentication token, access denied' });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
