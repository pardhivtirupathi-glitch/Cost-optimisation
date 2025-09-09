
import React, { useState, useMemo } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { useDarkMode } from './hooks/useDarkMode';
import { ThemeContext } from './contexts/ThemeContext';
import type { Page } from './types';


const App: React.FC = () => {
  const [page, setPage] = useState<Page>('dashboard');
  const [theme, setTheme] = useDarkMode();

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={`${theme} font-sans`}>
        <Layout currentPage={page} setPage={setPage}>
          {renderPage()}
        </Layout>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
