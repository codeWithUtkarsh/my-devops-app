import React from 'react';

const RecentProjectsDashboard = ({ onConnectNew }) => {
    const projects = [
        {
            id: 1,
            name: 'serverless-api',
            description: 'Express.js REST API with DynamoDB storage',
            status: 'Deployed',
            updated: '2 days ago',
            tech: 'API Gateway + Lambda',
            color: 'blue',
            icon: (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            )
        },
        {
            id: 2,
            name: 'react-dashboard',
            description: 'React SPA with analytics visualization',
            status: 'In Progress',
            updated: '1 week ago',
            tech: 'S3 + CloudFront',
            color: 'purple',
            icon: (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            id: 3,
            name: 'user-service',
            description: 'User authentication microservice',
            status: 'Draft',
            updated: '3 days ago',
            tech: 'Lambda + Cognito',
            color: 'orange',
            icon: (
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        }
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
                        </svg>
                    </button>
                    <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
                        JD
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome back, Jane</h1>
                        <p className="text-gray-400">Deploy your next serverless infrastructure with AI assistance</p>
                    </div>

                    {/* Action Button */}
                    <div className="mb-10">
                        <button
                            className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-8 rounded-lg flex items-center gap-2 transition-colors"
                            onClick={onConnectNew}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z" fill="currentColor"/>
                            </svg>
                            Connect New Repository
                        </button>
                    </div>

                    {/* Recent Projects Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                            {projects.map(project => (
                                <div key={project.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-accent-500 transition-colors">
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center">
                                                <div className={`w-10 h-10 bg-${project.color}-500 bg-opacity-20 rounded-md flex items-center justify-center text-${project.color}-400 mr-3`}>
                                                    {project.icon}
                                                </div>
                                                <h3 className="font-medium">{project.name}</h3>
                                            </div>
                                            <span className={`text-xs bg-${project.color === 'blue' ? 'green' : project.color === 'purple' ? 'accent' : 'gray'}-500 bg-opacity-20 text-${project.color === 'blue' ? 'green' : project.color === 'purple' ? 'accent' : 'gray'}-400 px-2 py-0.5 rounded-full`}>
                        {project.status}
                      </span>
                                        </div>
                                        <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Updated {project.updated}</span>
                                            <span>{project.tech}</span>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-800 p-3 flex justify-between bg-gray-950 bg-opacity-50">
                                        <a href="#" className="text-gray-400 hover:text-white text-sm">View Architecture</a>
                                        <a href="#" className="text-accent-500 hover:text-accent-400 text-sm">Edit Infrastructure</a>
                                    </div>
                                </div>
                            ))}
                        </div>
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

export default RecentProjectsDashboard;