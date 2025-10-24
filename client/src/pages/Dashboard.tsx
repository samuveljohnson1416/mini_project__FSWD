import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ChatInput from '../components/ChatInput';
import ExpenseList from '../components/ExpenseList';
import Summary, { SummaryData } from '../components/Summary';
import EditExpenseModal from '../components/EditExpenseModal';
import { expenseService, Expense } from '../services/expenseService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [dailySummary, setDailySummary] = useState<SummaryData | null>(null);
  const [monthlySummary, setMonthlySummary] = useState<SummaryData | null>(null);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    'all',
    'Food & Drinks',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Personal',
    'Other',
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const filterExpenses = useCallback(() => {
    let filtered = [...expenses];

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((exp) => exp.category === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((exp) =>
        exp.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredExpenses(filtered);
  }, [expenses, searchQuery, categoryFilter]);

  useEffect(() => {
    filterExpenses();
  }, [filterExpenses]);

  const fetchData = async () => {
    try {
      const [expensesData, dailyData, monthlyData] = await Promise.all([
        expenseService.getAll(),
        expenseService.getSummary('daily'),
        expenseService.getSummary('monthly'),
      ]);

      setExpenses(expensesData.expenses);
      setDailySummary(dailyData);
      setMonthlySummary(monthlyData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExpense = async (input: string) => {
    try {
      await expenseService.create({ input });
      await fetchData();
    } catch (error) {
      console.error('Error adding expense:', error);
      throw error;
    }
  };

  const handleEditExpense = async (
    id: string,
    data: { description: string; amount: number; category: string; date: string }
  ) => {
    try {
      await expenseService.update(id, data);
      await fetchData();
    } catch (error) {
      console.error('Error updating expense:', error);
      throw error;
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseService.delete(id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-warm-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="bg-dark-card border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-warm-orange to-warm-yellow bg-clip-text text-transparent">
              Smart Expense Tracker
            </h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/analytics"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Analytics
              </Link>
              <div className="text-right">
                <p className="text-white font-medium">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-400 hover:text-warm-orange transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Summary Cards */}
          <Summary dailySummary={dailySummary} monthlySummary={monthlySummary} />

          {/* Chat Input */}
          <ChatInput onSubmit={handleAddExpense} />

          {/* Filters */}
          <div className="card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Search Expenses
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by description..."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Filter by Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Recent Expenses ({filteredExpenses.length})
            </h2>
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={setSelectedExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      <EditExpenseModal
        expense={selectedExpense}
        onClose={() => setSelectedExpense(null)}
        onSave={handleEditExpense}
      />
    </div>
  );
};

export default Dashboard;
