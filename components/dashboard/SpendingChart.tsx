
import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import Card from '../shared/Card';
import type { SpendingTrendItem } from '../../types';
import { LoadingOverlay } from '../shared/Spinner';

interface SpendingChartProps {
  data: SpendingTrendItem[];
  isLoading: boolean;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <p className="label font-semibold text-gray-800 dark:text-gray-200">{`${label}`}</p>
        <p className="intro text-primary-500 dark:text-primary-400">{`Cost : ₹${new Intl.NumberFormat('en-IN').format(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const SpendingChart: React.FC<SpendingChartProps> = ({ data, isLoading }) => {
  return (
    <Card className="col-span-1 lg:col-span-2 relative">
       {isLoading && <LoadingOverlay message="Loading Trend..." />}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Spending Trend</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="name" stroke="currentColor" />
            <YAxis stroke="currentColor" tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SpendingChart;
