// src/components/TerraformEditor/Footer.js
import React from 'react';

const Footer = ({ isLoadingFiles, s3Config, validateTerraform, pushToRepository }) => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 py-3 px-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-sm">
                    <div className="text-gray-400 mr-6">
                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                        {isLoadingFiles ? 'Loading files...' : 'Files loaded'}
                    </div>
                    <div className="text-gray-400">
                        Bucket: <span className="text-white">{s3Config.bucketName}</span> |
                        Region: <span className="text-white">{s3Config.region}</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button
                        className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm flex items-center gap-1"
                        onClick={validateTerraform}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Validate
                    </button>
                    <button
                        className="bg-accent-500 hover:bg-accent-600 text-white py-2 px-4 rounded-md text-sm flex items-center gap-1"
                        onClick={pushToRepository}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="6" y1="3" x2="6" y2="15"></line>
                            <circle cx="18" cy="6" r="3"></circle>
                            <circle cx="6" cy="18" r="3"></circle>
                            <path d="M18 9a9 9 0 0 1-9 9"></path>
                        </svg>
                        Push to Repository
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;