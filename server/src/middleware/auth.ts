import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

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
    console.log('🔒 Auth middleware - Token received:', token ? 'exists' : 'missing');

    if (!token) {
      console.log('❌ Auth middleware - No token provided');
      res.status(401).json({ message: 'No authentication token, access denied' });
      return;
    }

    console.log('🔑 Auth middleware - Using JWT_SECRET:', JWT_SECRET.substring(0, 10) + '...');
    console.log('🎫 Auth middleware - Token prefix:', token.substring(0, 20) + '...');
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log('✅ Auth middleware - Token valid, userId:', decoded.userId);
    
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('❌ Auth middleware - Token verification failed:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
