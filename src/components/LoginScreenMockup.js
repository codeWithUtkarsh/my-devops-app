import React from 'react';

const LoginScreenMockup = ({ onLogin }) => {
    return (
        <div className="flex flex-col h-screen w-full bg-gray-950 text-white">
            {/* Header */}
            <header className="flex items-center bg-gray-950 p-5 border-b border-gray-800 h-14">
                <div className="flex items-center gap-2 text-white cursor-pointer">
                    <div className="text-xl">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <a href="/" className="text-2xl font-semibold text-accent-500 flex items-center">
                        bolt.devops
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-4xl font-bold text-white">Infrastructure as Code</h2>
                        <p className="mt-2 text-gray-400">
                            AI-powered AWS serverless architecture analysis and deployment
                        </p>
                    </div>

                    {/* Animated Background Pattern */}
                    <div className="relative mt-8 mb-12">
                        <div className="absolute inset-0 bg-gray-900 opacity-75 rounded-lg"></div>
                        <div className="relative p-8 rounded-lg border border-gray-800">
                            <div className="grid grid-cols-3 gap-3 opacity-40">
                                {Array(9).fill(0).map((_, i) => (
                                    <div key={i} className="h-8 rounded bg-gray-800 flex items-center justify-center">
                                        {i % 3 === 0 && <div className="w-3 h-3 rounded-full bg-accent-500"></div>}
                                        {i % 3 === 1 && <div className="w-5 h-1 rounded bg-gray-600"></div>}
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-8 rounded-lg flex items-center gap-2 transition-colors"
                                    onClick={onLogin}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="currentColor"/>
                                    </svg>
                                    Login with GitHub
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>Quickly analyze your codebase and deploy best-practice serverless infrastructure in minutes</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-4 px-6">
                <div className="flex justify-between text-sm text-gray-500">
                    <div>© 2025 bolt.devops</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-accent-500">Documentation</a>
                        <a href="#" className="hover:text-accent-500">GitHub</a>
                        <a href="#" className="hover:text-accent-500">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LoginScreenMockup;