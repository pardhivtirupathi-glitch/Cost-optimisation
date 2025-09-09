
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import type { Page } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, setPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <Sidebar currentPage={currentPage} setPage={setPage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header currentPage={currentPage} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
