
import React from 'react';

interface SpinnerProps {
    size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-primary-500`}></div>
    );
};

const LoadingOverlay: React.FC<{ message?: string }> = ({ message = "Loading..." }) => {
    return (
        <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 flex flex-col items-center justify-center z-10 rounded-xl">
            <Spinner size="lg" />
            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">{message}</p>
        </div>
    );
};


export { Spinner, LoadingOverlay };
