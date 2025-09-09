
import React, { useContext } from 'react';
import Card from '../components/shared/Card';
import { ThemeContext } from '../contexts/ThemeContext';

const SunIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const MoonIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);


const DarkModeToggle: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="flex items-center justify-between">
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appearance</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Customize the look and feel of the application.
                </p>
            </div>
            <button
                onClick={toggleTheme}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
                <span className="sr-only">Toggle theme</span>
                <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}>
                    {theme === 'dark' ? <MoonIcon className="h-4 w-4 text-gray-700" /> : <SunIcon className="h-4 w-4 text-gray-700" />}
                </span>
            </button>
        </div>
    );
};


const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
        <Card>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Manage your application preferences.</p>
            
            <div className="space-y-6">
                 <DarkModeToggle />

                <div className="border-t border-gray-200 dark:border-gray-700"></div>

                <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Currency</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        All financial data is displayed in Indian Rupees (₹) by default.
                    </p>
                    <div className="mt-4">
                        <input
                            type="text"
                            value="Indian Rupee (₹)"
                            disabled
                            className="w-full md:w-1/2 px-3 py-2 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </Card>
    </div>
  );
};

export default Settings;
