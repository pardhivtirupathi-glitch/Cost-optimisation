
import React, { useState, useEffect } from 'react';
import { fetchReports } from '../services/costApi';
import type { Report } from '../types';
import Card from '../components/shared/Card';

const DocumentPdfIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
);

const DocumentExcelIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);


const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Reports: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchReports().then(data => {
            setReports(data);
            setIsLoading(false);
        });
    }, []);

    const ReportRow: React.FC<{ report: Report }> = ({ report }) => (
        <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {report.type === 'PDF' ? <DocumentPdfIcon className="h-6 w-6 text-red-500" /> : <DocumentExcelIcon className="h-6 w-6 text-green-500" />}
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{report.name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.date}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{report.size}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200 flex items-center">
                    <DownloadIcon className="h-5 w-5 mr-1" />
                    Download
                </button>
            </td>
        </tr>
    );

    const SkeletonRow: React.FC = () => (
         <tr className="border-b border-gray-200 dark:border-gray-700">
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="h-6 w-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="ml-4 h-4 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </td>
            <td className="px-6 py-4"><div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div></td>
            <td className="px-6 py-4"><div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div></td>
            <td className="px-6 py-4 text-right"><div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 ml-auto"></div></td>
        </tr>
    );


    return (
        <Card>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Analysis History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">File Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Size</th>
                            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Download</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                            Array.from({length: 4}).map((_, i) => <SkeletonRow key={i} />)
                        ) : (
                            reports.map(report => <ReportRow key={report.id} report={report} />)
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Reports;
