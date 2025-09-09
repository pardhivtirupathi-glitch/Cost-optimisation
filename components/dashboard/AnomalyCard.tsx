import React from 'react';
import Card from '../shared/Card';
import type { CostAnomaly } from '../../types';

const AlertIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


interface AnomalyCardProps {
  anomaly: CostAnomaly | null;
  isLoading: boolean;
}

const AnomalyCard: React.FC<AnomalyCardProps> = ({ anomaly, isLoading }) => {

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
      ) : anomaly ? (
        <div className="text-yellow-700 dark:text-yellow-300">
          <div className="flex items-center justify-between">
             <p className="text-sm font-medium text-yellow-600 dark:text-yellow-200">Cost Anomaly</p>
             <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300">
                <AlertIcon className="h-6 w-6"/>
             </div>
          </div>
          <p className="mt-2 text-2xl font-semibold text-yellow-800 dark:text-yellow-200">
            +{anomaly.increasePercentage}% Spike
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-400 font-medium">{anomaly.service}</p>
          <p className="text-sm text-yellow-600 dark:text-yellow-500">
             Increased by ₹{formatCurrency(anomaly.amount)} on {anomaly.date}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
             <CheckCircleIcon className="h-12 w-12 text-green-500 mb-2"/>
             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">All Good!</h3>
             <p className="text-sm text-gray-500 dark:text-gray-400">No cost anomalies detected in the last 30 days.</p>
        </div>
      )}
    </Card>
  );
};

export default AnomalyCard;
