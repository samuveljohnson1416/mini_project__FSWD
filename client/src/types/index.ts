// Global type definitions for the application

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Expense {
  _id: string;
  userId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export type ExpenseCategory =
  | 'Food & Drinks'
  | 'Shopping'
  | 'Transportation'
  | 'Entertainment'
  | 'Bills & Utilities'
  | 'Healthcare'
  | 'Education'
  | 'Travel'
  | 'Personal'
  | 'Other';

export interface ExpenseSummary {
  period: 'daily' | 'monthly';
  total: number;
  count: number;
  categoryBreakdown: Record<string, number>;
}

export interface AnalyticsData {
  categoryData: Array<{ name: string; value: number }>;
  trendData: Array<{ date: string; amount: number }>;
  totalExpenses: number;
}

export interface ApiError {
  message: string;
  errors?: Array<{ msg: string; param: string }>;
}
