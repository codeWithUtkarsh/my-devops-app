import React from 'react';

const RepositoryDashboardWithModal = ({ onSelect, onCancel }) => {
    const repositoryData = [
        { name: 'serverless-api', description: 'Node.js API with Express', updated: '2 days ago', stars: 12 },
        { name: 'react-dashboard', description: 'React frontend for analytics dashboard', updated: '1 week ago', stars: 45 },
        { name: 'user-service', description: 'Microservice for user management', updated: '3 days ago', stars: 8 },
        { name: 'payment-gateway', description: 'Stripe integration service', updated: '5 days ago', stars: 15 },
        { name: 'notification-service', description: 'Email and push notification system', updated: '1 month ago', stars: 23 },
        { name: 'data-processing', description: 'ETL pipeline for analytics', updated: '2 weeks ago', stars: 7 }
    ];

    return (
        <div className="flex flex-col h-screen w-full bg-gray-950 text-white">
            {/* Header */}
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
                    <button className="text-gray-400 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
                {/* Empty State (Dimmed in Background) */}
                <div className="max-w-2xl w-full space-y-8 text-center opacity-50">
                    <div>
                        <svg className="mx-auto h-24 w-24 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14H11V21L20 10H13Z" />
                        </svg>
                        <h2 className="mt-4 text-3xl font-bold text-white">Connect a repository</h2>
                        <p className="mt-2 text-gray-400 max-w-md mx-auto">
                            Connect your GitHub repository to analyze its structure and get AWS serverless architecture recommendations.
                        </p>
                    </div>

                    <button className="mx-auto bg-accent-500 hover:bg-accent-600 text-white py-3 px-8 rounded-lg flex items-center gap-2 transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="currentColor"/>
                        </svg>
                        Connect Repository
                    </button>
                </div>

                {/* Repository Selection Modal (Active/Visible) */}
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
                    <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl shadow-xl border border-gray-700">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold">Select a Repository</h3>
                            <button className="text-gray-400 hover:text-white" onClick={onCancel}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search repositories..."
                                    className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
                                />
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-96 space-y-2">
                            {/* Repository Items */}
                            {repositoryData.map((repo, index) => (
                                <div
                                    key={index}
                                    className={`border ${index === 0 ? 'border-accent-500 bg-gray-700' : 'border-gray-700 hover:bg-gray-700'} rounded-md p-4 cursor-pointer transition-colors`}
                                    onClick={onSelect}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center">
                                                <h4 className={`font-medium ${index === 0 ? 'text-accent-400' : 'text-white'}`}>{repo.name}</h4>
                                                <div className="ml-2 flex items-center text-gray-500 text-xs">
                                                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                                                    </svg>
                                                    {repo.stars}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400">{repo.description}</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-gray-500 mb-1">Updated {repo.updated}</span>
                                            {index === 0 &&
                                                <span className="text-xs bg-accent-500 bg-opacity-20 text-accent-400 px-2 py-0.5 rounded-full">
                          Selected
                        </span>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="text-gray-400 hover:text-white mr-4 px-4 py-2"
                                onClick={onCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-accent-500 hover:bg-accent-600 text-white py-2 px-6 rounded-md transition-colors"
                                onClick={onSelect}
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default RepositoryDashboardWithModal;