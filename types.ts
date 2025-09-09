export type Page = 'dashboard' | 'upload' | 'reports' | 'settings';

export interface DashboardSummary {
  totalMonthlyCost: number;
  forecastedNextMonthCost: number;
  lastMonthCost: number;
}

export interface SpendingTrendItem {
  name: string;
  cost: number;
}

export interface ServiceDistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  potentialSaving: number;
  category: 'Cost' | 'Security' | 'Performance';
}

export interface Report {
  id: string;
  name: string;
  date: string;
  type: 'PDF' | 'Excel';
  size: string;
}

export interface BudgetStatus {
  spent: number;
  budget: number;
}

export interface CostAnomaly {
  service: string;
  increasePercentage: number;
  amount: number;
  date: string;
}


export type Theme = 'light' | 'dark';