import React from 'react';
import Card from '../shared/Card';
import { useCountUp } from '../../hooks/useCountUp';

const ArrowUpIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
)

const ArrowDownIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
)

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  isLoading: boolean;
  change?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, prefix = '₹', suffix = '', isLoading, change }) => {
  const animatedValue = useCountUp(value, 1500);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };
  
  const isIncrease = change && change > 0;

  return (
    <Card className="flex flex-col justify-between h-full">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-28">
            <div className="animate-pulse flex space-x-4 w-full">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
                <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
            </div>
        </div>
      ) : (
        <>
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300">
                    {icon}
                </div>
            </div>
            <div className="mt-2">
                <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {prefix}{formatCurrency(animatedValue)}{suffix}
                </p>
                {change !== undefined && (
                    <div className="flex items-center text-sm mt-1">
                        <span className={`flex items-center font-semibold ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
                           {isIncrease ? <ArrowUpIcon className="h-4 w-4 mr-1"/> : <ArrowDownIcon className="h-4 w-4 mr-1"/> }
                           {Math.abs(change).toFixed(2)}%
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
                    </div>
                )}
            </div>
        </>
      )}
    </Card>
  );
};

export default StatCard;