
import React from 'react';
import type { Page } from '../../types';

interface HeaderProps {
    currentPage: Page;
    setSidebarOpen: (open: boolean) => void;
}

const pageTitles: Record<Page, string> = {
    dashboard: 'Dashboard',
    upload: 'Upload Data',
    reports: 'Reports',
    settings: 'Settings',
};

const Header: React.FC<HeaderProps> = ({ currentPage, setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 dark:text-gray-400 focus:outline-none lg:hidden">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white ml-4 lg:ml-0">
          {pageTitles[currentPage]}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://picsum.photos/100"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
