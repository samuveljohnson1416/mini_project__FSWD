import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { expenseService } from '../services/expenseService';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState<{
    categoryData: Array<{ name: string; value: number }>;
    trendData: Array<{ date: string; amount: number }>;
    totalExpenses: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const COLORS = ['#ff6b35', '#f7931e', '#e63946', '#4a90e2', '#50c878', '#9b59b6', '#e74c3c', '#3498db', '#f39c12', '#95a5a6'];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await expenseService.getAnalytics();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
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
              Analytics
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-dark-card border border-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Total Expenses Card */}
          <div className="card bg-gradient-to-br from-warm-orange/20 to-warm-yellow/20 border-warm-orange/30">
            <h2 className="text-lg font-semibold text-gray-300 mb-2">Total Expenses (Last 30 Days)</h2>
            <p className="text-5xl font-bold text-white">
              ₹{analyticsData?.totalExpenses.toFixed(2) || '0.00'}
            </p>
          </div>

          {/* Category-wise Breakdown */}
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Spending by Category</h2>
            {analyticsData && analyticsData.categoryData.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1a1a1a',
                          border: '1px solid #333',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Category List */}
                <div className="space-y-3">
                  {analyticsData.categoryData
                    .sort((a, b) => b.value - a.value)
                    .map((category, index) => (
                      <div key={category.name} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-white font-medium">{category.name}</span>
                        </div>
                        <span className="text-warm-orange font-bold">₹{category.value.toFixed(2)}</span>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">No data available</p>
            )}
          </div>

          {/* Spending Trend */}
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Daily Spending Trend</h2>
            {analyticsData && analyticsData.trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis
                    dataKey="date"
                    stroke="#888"
                    tick={{ fill: '#888' }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return `${date.getMonth() + 1}/${date.getDate()}`;
                    }}
                  />
                  <YAxis stroke="#888" tick={{ fill: '#888' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    labelFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString();
                    }}
                    formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Amount']}
                  />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  <Bar dataKey="amount" fill="#ff6b35" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400 text-center py-8">No trend data available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
