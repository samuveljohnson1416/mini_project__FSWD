import dotenv from 'dotenv';
import path from 'path';

// Prioritize server/.env, then fallback to root .env
dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config();

export const PORT = Number(process.env.PORT) || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGODB_URI = process.env.MONGODB_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'smart_expense_tracker_secret_jwt_key_2026';
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
