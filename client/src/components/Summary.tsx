import React from 'react';

export interface SummaryData {
  period: string;
  total: number;
  count: number;
  categoryBreakdown: Record<string, number>;
}

interface SummaryProps {
  dailySummary: SummaryData | null;
  monthlySummary: SummaryData | null;
}

const Summary: React.FC<SummaryProps> = ({ dailySummary, monthlySummary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Daily Summary */}
      <div className="card bg-gradient-to-br from-warm-orange/10 to-warm-yellow/10 border-warm-orange/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Today's Spending</h3>
          <svg
            className="w-6 h-6 text-warm-orange"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-4xl font-bold text-white">
            ₹{dailySummary?.total.toFixed(2) || '0.00'}
          </p>
          <p className="text-gray-400">
            {dailySummary?.count || 0} transaction{(dailySummary?.count || 0) !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="card bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">This Month</h3>
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-4xl font-bold text-white">
            ₹{monthlySummary?.total.toFixed(2) || '0.00'}
          </p>
          <p className="text-gray-400">
            {monthlySummary?.count || 0} transaction{(monthlySummary?.count || 0) !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
