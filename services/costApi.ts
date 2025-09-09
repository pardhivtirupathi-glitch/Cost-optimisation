import type { DashboardSummary, SpendingTrendItem, ServiceDistributionItem, Suggestion, Report, BudgetStatus, CostAnomaly } from '../types';

const mockApiCall = <T,>(data: T, delay = 500): Promise<T> => {
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

export const fetchDashboardSummary = (): Promise<DashboardSummary> => {
  const data: DashboardSummary = {
    totalMonthlyCost: 125670.55,
    forecastedNextMonthCost: 132450.00,
    lastMonthCost: 110000.00,
  };
  return mockApiCall(data);
};

export const fetchSpendingTrend = (): Promise<SpendingTrendItem[]> => {
  const data: SpendingTrendItem[] = [
    { name: 'Jan', cost: 65000 },
    { name: 'Feb', cost: 72000 },
    { name: 'Mar', cost: 81000 },
    { name: 'Apr', cost: 78000 },
    { name: 'May', cost: 95000 },
    { name: 'Jun', cost: 110000 },
    { name: 'Jul', cost: 125670 },
  ];
  return mockApiCall(data, 800);
};

export const fetchServiceDistribution = (): Promise<ServiceDistributionItem[]> => {
  const data: ServiceDistributionItem[] = [
    { name: 'AWS EC2', value: 45, color: '#3b82f6' },
    { name: 'AWS S3', value: 25, color: '#10b981' },
    { name: 'AWS RDS', value: 15, color: '#f97316' },
    { name: 'AWS Lambda', value: 10, color: '#8b5cf6' },
    { name: 'Other', value: 5, color: '#64748b' },
  ];
  return mockApiCall(data, 1000);
};

export const fetchSuggestions = (): Promise<Suggestion[]> => {
  const data: Suggestion[] = [
    { id: '1', title: 'Optimize EC2 Instances', description: 'Downsize 5 underutilized t3.large instances to t3.medium.', potentialSaving: 12500, category: 'Cost' },
    { id: '2', title: 'Implement S3 Lifecycle Policy', description: 'Transition 2TB of infrequent access data to Glacier.', potentialSaving: 4200, category: 'Cost' },
    { id: '3', title: 'Upgrade RDS Instances', description: 'Upgrade 2 instances to the latest generation for better performance.', potentialSaving: 0, category: 'Performance' },
    { id: '4', title: 'Review IAM Policies', description: 'Remove 12 unused IAM roles to reduce security risks.', potentialSaving: 0, category: 'Security' },
  ];
  return mockApiCall(data, 1200);
};

export const fetchReports = (): Promise<Report[]> => {
    const data: Report[] = [
        { id: '1', name: 'July_2024_Cost_Analysis.pdf', date: '2024-8-01', type: 'PDF', size: '2.5 MB' },
        { id: '2', name: 'June_2024_Cost_Analysis.pdf', date: '2024-7-01', type: 'PDF', size: '2.3 MB' },
        { id: '3', name: 'Q2_2024_Summary.xlsx', date: '2024-7-05', type: 'Excel', size: '850 KB' },
        { id: '4', name: 'May_2024_Cost_Analysis.pdf', date: '2024-6-01', type: 'PDF', size: '2.1 MB' },
    ];
    return mockApiCall(data, 600);
};


export const fetchBudgetStatus = (): Promise<BudgetStatus> => {
    const data: BudgetStatus = {
        spent: 125670.55,
        budget: 150000.00,
    };
    return mockApiCall(data, 700);
};

export const fetchCostAnomalies = (): Promise<CostAnomaly | null> => {
    // Simulate finding an anomaly sometimes
    if (Math.random() > 0.3) {
        const data: CostAnomaly = {
            service: 'AWS Data Transfer',
            increasePercentage: 320,
            amount: 8500,
            date: '2024-07-28',
        };
        return mockApiCall(data, 1400);
    }
    return mockApiCall(null, 1400);
};