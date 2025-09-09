
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import Card from '../shared/Card';
import type { ServiceDistributionItem } from '../../types';
import { LoadingOverlay } from '../shared/Spinner';

interface ServicePieChartProps {
  data: ServiceDistributionItem[];
  isLoading: boolean;
}

const ServicePieChart: React.FC<ServicePieChartProps> = ({ data, isLoading }) => {
  return (
    <Card className="col-span-1 relative">
      {isLoading && <LoadingOverlay message="Analyzing Services..." />}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Top 5 Services</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                return (
                  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value}%`, "Distribution"]}/>
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ServicePieChart;
