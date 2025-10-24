import { Request, Response } from 'express';
import { Expense } from '../models/Expense';
import { parseExpenseInput } from '../utils/expenseParser';

export const createExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const { input, description, amount, category, date } = req.body;

    let expenseData;

    // If natural language input is provided, parse it
    if (input) {
      expenseData = parseExpenseInput(input);
      if (!expenseData) {
        res.status(400).json({ message: 'Could not parse expense input' });
        return;
      }
    } else {
      // Manual input
      if (!description || amount === undefined) {
        res.status(400).json({ message: 'Description and amount are required' });
        return;
      }
      expenseData = { description, amount, category: category || 'Other', date: date || new Date() };
    }

    const expense = new Expense({
      userId,
      ...expenseData
    });

    await expense.save();

    res.status(201).json({
      message: 'Expense created successfully',
      expense
    });
  } catch (error: unknown) {
    console.error('Create expense error:', error);
    res.status(500).json({ message: 'Server error while creating expense' });
  }
};

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const { startDate, endDate, category, search } = req.query;

    const query: Record<string, unknown> = { userId };

    // Date filtering
    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        (query.date as Record<string, unknown>).$gte = new Date(startDate as string);
      }
      if (endDate) {
        (query.date as Record<string, unknown>).$lte = new Date(endDate as string);
      }
    }

    // Category filtering
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search filtering
    if (search) {
      query.description = { $regex: search, $options: 'i' };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    res.json({ expenses });
  } catch (error: unknown) {
    console.error('Get expenses error:', error);
    res.status(500).json({ message: 'Server error while fetching expenses' });
  }
};

export const getExpenseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const { id } = req.params;

    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }

    res.json({ expense });
  } catch (error: unknown) {
    console.error('Get expense error:', error);
    res.status(500).json({ message: 'Server error while fetching expense' });
  }
};

export const updateExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const { id } = req.params;
    const { description, amount, category, date } = req.body;

    const expense = await Expense.findOne({ _id: id, userId });

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }

    if (description) expense.description = description;
    if (amount !== undefined) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = new Date(date);

    await expense.save();

    res.json({
      message: 'Expense updated successfully',
      expense
    });
  } catch (error: unknown) {
    console.error('Update expense error:', error);
    res.status(500).json({ message: 'Server error while updating expense' });
  }
};

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    if (!expense) {
      res.status(404).json({ message: 'Expense not found' });
      return;
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (error: unknown) {
    console.error('Delete expense error:', error);
    res.status(500).json({ message: 'Server error while deleting expense' });
  }
};

export const getExpenseSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;
    const { period } = req.query; // 'daily' or 'monthly'

    const now = new Date();
    let startDate: Date;

    if (period === 'daily') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else {
      // monthly
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate }
    });

    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Category breakdown
    const categoryBreakdown = expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = 0;
      }
      acc[exp.category] += exp.amount;
      return acc;
    }, {} as Record<string, number>);

    res.json({
      period,
      total,
      count: expenses.length,
      categoryBreakdown
    });
  } catch (error: unknown) {
    console.error('Get summary error:', error);
    res.status(500).json({ message: 'Server error while fetching summary' });
  }
};

export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as { userId?: string }).userId;

    // Get last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await Expense.find({
      userId,
      date: { $gte: thirtyDaysAgo }
    }).sort({ date: 1 });

    // Category-wise totals
    const categoryData = expenses.reduce((acc, exp) => {
      if (!acc[exp.category]) {
        acc[exp.category] = 0;
      }
      acc[exp.category] += exp.amount;
      return acc;
    }, {} as Record<string, number>);

    const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
      name,
      value
    }));

    // Daily totals for trend
    const dailyData = expenses.reduce((acc, exp) => {
      const dateKey = exp.date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = 0;
      }
      acc[dateKey] += exp.amount;
      return acc;
    }, {} as Record<string, number>);

    const trendData = Object.entries(dailyData).map(([date, amount]) => ({
      date,
      amount
    }));

    res.json({
      categoryData: categoryChartData,
      trendData,
      totalExpenses: expenses.reduce((sum, exp) => sum + exp.amount, 0)
    });
  } catch (error: unknown) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching analytics' });
  }
};
