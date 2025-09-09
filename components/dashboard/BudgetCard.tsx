import React from 'react';
import Card from '../shared/Card';

const WalletIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

interface BudgetCardProps {
  spent: number;
  budget: number;
  isLoading: boolean;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ spent, budget, isLoading }) => {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;

  const getProgressBarColor = () => {
    if (percentage > 95) return 'bg-red-500';
    if (percentage > 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };
  
  return (
    <Card className="flex flex-col justify-between h-full">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-28">
            <div className="animate-pulse flex space-x-4 w-full">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        </div>
      ) : (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Budget</p>
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300">
                        <WalletIcon className="h-6 w-6"/>
                    </div>
                </div>
                 <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(percentage)}% used
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Spent ₹{formatCurrency(spent)} of ₹{formatCurrency(budget)}
                </p>
            </div>
            <div className="mt-4">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                        className={`h-2.5 rounded-full ${getProgressBarColor()}`} 
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                </div>
            </div>
        </>
      )}
    </Card>
  );
};

export default BudgetCard;
