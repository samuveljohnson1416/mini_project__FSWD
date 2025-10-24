import api from './api';

export interface Expense {
  _id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateExpenseData {
  input?: string;
  description?: string;
  amount?: number;
  category?: string;
  date?: string;
}

export interface ExpenseFilters {
  startDate?: string;
  endDate?: string;
  category?: string;
  search?: string;
}

export const expenseService = {
  create: async (data: CreateExpenseData) => {
    const response = await api.post('/expenses', data);
    return response.data;
  },

  getAll: async (filters?: ExpenseFilters) => {
    const response = await api.get('/expenses', { params: filters });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  update: async (id: string, data: Partial<CreateExpenseData>) => {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },

  getSummary: async (period: 'daily' | 'monthly') => {
    const response = await api.get('/expenses/summary', { params: { period } });
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/expenses/analytics');
    return response.data;
  },
};
