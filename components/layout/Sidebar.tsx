
import React, { Fragment } from 'react';
import type { Page } from '../../types';

const ChartBarIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const UploadIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

const DocumentReportIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CogIcon: React.FC<{className: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const navigationItems: { id: Page; name: string; icon: React.FC<{className: string}> }[] = [
  { id: 'dashboard', name: 'Dashboard', icon: ChartBarIcon },
  { id: 'upload', name: 'Upload Data', icon: UploadIcon },
  { id: 'reports', name: 'Reports', icon: DocumentReportIcon },
  { id: 'settings', name: 'Settings', icon: CogIcon },
];

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const NavLink: React.FC<{
    item: { id: Page; name: string; icon: React.FC<{className: string}> };
    isActive: boolean;
    onClick: () => void;
}> = ({ item, isActive, onClick }) => {
    const baseClasses = "flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200";
    const activeClasses = "bg-primary-500 text-white";
    const inactiveClasses = "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700";
    
    return (
        <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            <item.icon className="h-6 w-6" />
            <span className="mx-4 font-medium">{item.name}</span>
        </a>
    );
};

const SidebarContent: React.FC<{ currentPage: Page; setPage: (page: Page) => void; onLinkClick: () => void; }> = ({ currentPage, setPage, onLinkClick }) => (
    <div className="flex flex-col justify-between flex-1">
        <nav className="px-2">
            {navigationItems.map((item) => (
                <NavLink 
                    key={item.id} 
                    item={item} 
                    isActive={currentPage === item.id} 
                    onClick={() => { setPage(item.id); onLinkClick(); }} 
                />
            ))}
        </nav>
    </div>
);


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto bg-white dark:bg-gray-800 transform lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}>
        <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
                <span className="text-white text-2xl mx-2 font-semibold bg-primary-600 p-2 rounded-md dark:text-white">CC</span>
                <span className="text-gray-800 dark:text-white text-2xl mx-2 font-semibold">Optimizer</span>
            </div>
        </div>
        <div className="mt-8">
             <SidebarContent currentPage={currentPage} setPage={setPage} onLinkClick={() => setSidebarOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
