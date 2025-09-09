import React, { useState, useEffect } from 'react';
import Card from '../components/shared/Card';
import StatCard from '../components/dashboard/StatCard';
import SpendingChart from '../components/dashboard/SpendingChart';
import ServicePieChart from '../components/dashboard/ServicePieChart';
import SuggestionCard from '../components/dashboard/SuggestionCard';
import BudgetCard from '../components/dashboard/BudgetCard';
import AnomalyCard from '../components/dashboard/AnomalyCard';

import { fetchDashboardSummary, fetchSpendingTrend, fetchServiceDistribution, fetchSuggestions, fetchBudgetStatus, fetchCostAnomalies } from '../services/costApi';
import type { DashboardSummary, SpendingTrendItem, ServiceDistributionItem, Suggestion, BudgetStatus, CostAnomaly } from '../types';

const CurrencyRupeeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h5m-5 4h5M5 8h14a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2z" />
    </svg>
);

const TrendingUpIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const LightBulbIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [spendingTrend, setSpendingTrend] = useState<SpendingTrendItem[]>([]);
  const [serviceDistribution, setServiceDistribution] = useState<ServiceDistributionItem[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [budget, setBudget] = useState<BudgetStatus | null>(null);
  const [anomaly, setAnomaly] = useState<CostAnomaly | null>(null);
  const [loading, setLoading] = useState({
      summary: true,
      trend: true,
      distribution: true,
      suggestions: true,
      budget: true,
      anomaly: true,
  });

  useEffect(() => {
    const loadData = async () => {
      fetchDashboardSummary().then(data => {
        setSummary(data);
        setLoading(prev => ({...prev, summary: false}));
      });
      fetchSpendingTrend().then(data => {
        setSpendingTrend(data);
        setLoading(prev => ({...prev, trend: false}));
      });
      fetchServiceDistribution().then(data => {
        setServiceDistribution(data);
        setLoading(prev => ({...prev, distribution: false}));
      });
      fetchSuggestions().then(data => {
        setSuggestions(data);
        setLoading(prev => ({...prev, suggestions: false}));
      });
      fetchBudgetStatus().then(data => {
          setBudget(data);
          setLoading(prev => ({...prev, budget: false}));
      });
      fetchCostAnomalies().then(data => {
          setAnomaly(data);
          setLoading(prev => ({...prev, anomaly: false}));
      });
    };
    loadData();
  }, []);
  
  const monthlyCostChange = summary ? ((summary.totalMonthlyCost - summary.lastMonthCost) / summary.lastMonthCost) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Monthly Cost" value={summary?.totalMonthlyCost ?? 0} icon={<CurrencyRupeeIcon className="h-6 w-6"/>} isLoading={loading.summary} change={monthlyCostChange} />
        <StatCard title="Forecasted Next Month Cost" value={summary?.forecastedNextMonthCost ?? 0} icon={<TrendingUpIcon className="h-6 w-6"/>} isLoading={loading.summary} />
        <BudgetCard spent={budget?.spent ?? 0} budget={budget?.budget ?? 0} isLoading={loading.budget} />
        <AnomalyCard anomaly={anomaly} isLoading={loading.anomaly} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SpendingChart data={spendingTrend} isLoading={loading.trend} />
        <ServicePieChart data={serviceDistribution} isLoading={loading.distribution} />
      </div>

      <Card>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <LightBulbIcon className="h-6 w-6 mr-2 text-yellow-400" />
            Actionable Recommendations
        </h2>
        <div className="space-y-4">
            {loading.suggestions ? (
                Array.from({length: 4}).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm animate-pulse">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                ))
            ) : (
                suggestions.map(s => <SuggestionCard key={s.id} suggestion={s} />)
            )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;