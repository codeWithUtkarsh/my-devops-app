// src/components/TerraformEditor/Header.js
import React from 'react';

const Header = ({ s3Config }) => {
    return (
        <header className="flex items-center justify-between bg-gray-950 p-5 border-b border-gray-800 h-14">
            <div className="flex items-center gap-2 text-white">
                <div className="text-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <a href="/" className="text-2xl font-semibold text-accent-500 flex items-center">
                    bolt.devops
                </a>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-gray-400 text-sm">
                    Project: <span className="text-white font-medium">{s3Config.prefix.replace('/', '')}</span>
                </div>
                <div className="flex border border-gray-800 rounded-md overflow-hidden">
                    <button className="text-accent-500 bg-gray-900 px-4 py-1.5 text-sm font-medium">
                        Edit
                    </button>
                    <button className="text-gray-400 hover:text-white px-4 py-1.5 text-sm">
                        View
                    </button>
                </div>
                <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                    JD
                </div>
            </div>
        </header>
    );
};

export default Header;