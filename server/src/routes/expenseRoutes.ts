import { Router } from 'express';
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getExpenseSummary,
  getAnalytics
} from '../controllers/expenseController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/summary', getExpenseSummary);
router.get('/analytics', getAnalytics);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
