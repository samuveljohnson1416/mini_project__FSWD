import React, { useState } from 'react';
import { Expense } from '../services/expenseService';
import { format } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food & Drinks': 'bg-orange-500',
      'Shopping': 'bg-pink-500',
      'Transportation': 'bg-blue-500',
      'Entertainment': 'bg-purple-500',
      'Bills & Utilities': 'bg-yellow-500',
      'Healthcare': 'bg-red-500',
      'Education': 'bg-green-500',
      'Travel': 'bg-cyan-500',
      'Personal': 'bg-indigo-500',
      'Other': 'bg-gray-500',
    };
    return colors[category] || 'bg-gray-500';
  };

  if (expenses.length === 0) {
    return (
      <div className="card text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-400 text-lg">No expenses yet</p>
        <p className="text-gray-500 text-sm mt-2">Start adding expenses using the chat input above</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="expense-item"
          onClick={() => setExpandedId(expandedId === expense._id ? null : expense._id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(expense.category)}`} />
              <div className="flex-1">
                <h3 className="text-white font-medium">{expense.description}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-400">{expense.category}</span>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-gray-400">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-warm-orange">₹{expense.amount.toFixed(2)}</p>
            </div>
          </div>

          {expandedId === expense._id && (
            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(expense);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Are you sure you want to delete this expense?')) {
                    onDelete(expense._id);
                  }
                }}
                className="px-4 py-2 bg-warm-red text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
