
import React from 'react';
import type { Suggestion } from '../../types';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const categoryColors = {
  Cost: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Security: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Performance: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row sm:items-start justify-between">
      <div>
        <div className="flex items-center mb-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[suggestion.category]}`}>
            {suggestion.category}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 dark:text-white">{suggestion.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{suggestion.description}</p>
      </div>
      {suggestion.potentialSaving > 0 && (
        <div className="mt-4 sm:mt-0 sm:ml-4 text-left sm:text-right flex-shrink-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">Potential Saving</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">₹{new Intl.NumberFormat('en-IN').format(suggestion.potentialSaving)}/mo</p>
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;
