
import React, { useState, useCallback } from 'react';
import Card from '../components/shared/Card';

// Constants for file validation
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ['.csv', '.xlsx'];
const ALLOWED_MIME_TYPES = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

// Icons
const FileIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0011.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
const RemoveIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const Upload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (selectedFile: File): string | null => {
        const fileExtension = `.${selectedFile.name.split('.').pop()?.toLowerCase()}`;

        if (!ALLOWED_EXTENSIONS.includes(fileExtension) && !ALLOWED_MIME_TYPES.includes(selectedFile.type)) {
            return 'Invalid file type. Please upload a CSV or XLSX file.';
        }

        if (selectedFile.size > MAX_FILE_SIZE) {
            return `File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`;
        }

        return null;
    };

    const handleFileSelection = (selectedFile: File | undefined) => {
        if (!selectedFile) return;

        setError(null);
        setUploadSuccess(false);

        const validationError = validateFile(selectedFile);

        if (validationError) {
            setError(validationError);
            setFile(null);
        } else {
            setFile(selectedFile);
        }
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        handleFileSelection(e.dataTransfer.files?.[0]);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelection(e.target.files?.[0]);
        e.target.value = ''; // Allow re-uploading the same file
    };

    const handleUpload = () => {
        if (!file) return;
        setIsUploading(true);
        setUploadSuccess(false);
        setError(null);
        
        // Simulate API call
        setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(true);
            setFile(null);
        }, 2000);
    };

    const removeFile = () => {
        setFile(null);
        setError(null);
        setUploadSuccess(false);
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <Card>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Upload Cost Report</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Upload your CSV/Excel file containing cost and usage data. The system will analyze it and provide optimization insights.</p>
                
                <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className="relative">
                    <label 
                        htmlFor="dropzone-file"
                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                            dragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 
                            error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 
                            'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V16m7-2V7a4 4 0 00-4-4H9.828a1 1 0 00-.707.293l-4.414 4.414A1 1 0 004 8.172V16a4 4 0 004 4h4.586a1 1 0 00.707-.293l4.414-4.414a1 1 0 00.293-.707V11m-7 5v-4m0 0H8m4 0h4m-4 4v-4m0 0L8 8m4 4l4-4"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">CSV or XLSX (MAX. 10MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" onChange={handleFileChange} />
                    </label>
                </div>
                
                {error && <p className="mt-3 text-center text-sm text-red-600 dark:text-red-400">{error}</p>}
                
                {file && (
                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg flex items-center justify-between animate-fade-in">
                        <div className="flex items-center truncate">
                            <FileIcon className="h-6 w-6 text-primary-500 flex-shrink-0" />
                            <div className="ml-3 truncate">
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button onClick={removeFile} className="ml-4 p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors">
                            <span className="sr-only">Remove file</span>
                            <RemoveIcon className="h-5 w-5" />
                        </button>
                    </div>
                )}

                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={handleUpload} 
                        disabled={!file || isUploading}
                        className="px-6 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center transition-colors"
                    >
                        {isUploading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>}
                        {isUploading ? 'Uploading...' : 'Analyze Now'}
                    </button>
                </div>
                {uploadSuccess && <p className="mt-4 text-center text-green-600 dark:text-green-400 animate-fade-in">File uploaded and analysis started successfully!</p>}
            </Card>

            <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">Or</span>
                <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <Card>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Manual Data Entry</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Enter cost data manually for a single service.</p>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Name</label>
                        <input type="text" id="service" className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" placeholder="e.g., AWS EC2 t3.large" />
                    </div>
                    <div>
