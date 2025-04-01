import React from 'react';

const ArchitectureRecommendationMockup = () => {
  return (
    <div className="flex flex-col w-full h-screen bg-gray-950 text-white overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-950 px-8 py-4 border-b border-gray-800 h-16 shadow-lg">
        <div className="flex items-center gap-3 text-white">
          <div className="text-xl">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <a href="/" className="text-2xl font-semibold text-accent-500 flex items-center">
            bolt.devops
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-gray-400 text-sm">
            Project: <span className="text-white font-medium ml-1">serverless-api</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-accent-500 flex items-center justify-center text-sm font-medium">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-950 p-8 overflow-hidden">
        <div className="w-full h-full max-w-7xl mx-auto flex gap-8">
          {/* Left Column: Application Analysis */}
          <div className="w-1/3 h-full">
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <h3 className="font-medium text-lg">Application Analysis</h3>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto">
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Application Type</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">Express.js REST API</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Detected Dependencies</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                      express (4.17.1)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                      mongoose (6.0.12)
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                      jsonwebtoken (8.5.1)
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Database Requirements</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-green-500">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V9M12 15V18M12 2C8.15 2 5 3.9 5 6.25C5 9.25 5 14.75 5 17.75C5 20.1 8.15 22 12 22C15.85 22 19 20.1 19 17.75C19 14.75 19 9.25 19 6.25C19 3.9 15.85 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    MongoDB (NoSQL)
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 px-6 py-4 border-t border-gray-700 text-center mt-auto">
                <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors text-sm font-medium">
                  View Full Analysis
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: AWS Architecture */}
          <div className="w-2/3 h-full flex flex-col">
            <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg overflow-hidden flex-1">
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium text-lg">Recommended AWS Architecture</h3>
                <div className="flex gap-3">
                  <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium transition-colors">Zoom In</button>
                  <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium transition-colors">Zoom Out</button>
                </div>
              </div>

              {/* Architecture Diagram */}
              <div className="flex-1 p-10 flex items-center justify-center overflow-auto">
                <div className="grid grid-cols-1 gap-10 items-center">
                  {/* API Gateway */}
                  <div className="w-64 h-20 border-2 border-accent-500 bg-accent-500 bg-opacity-10 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-base font-medium">API Gateway</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="flex gap-16 justify-center">
                    {/* Auth Lambda */}
                    <div className="w-52 h-20 border-2 border-orange-500 bg-orange-500 bg-opacity-10 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-sm font-medium">Auth Lambda</span>
                    </div>
                    {/* API Lambda */}
                    <div className="w-52 h-20 border-2 border-orange-500 bg-orange-500 bg-opacity-10 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-sm font-medium">API Lambda</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {/* DynamoDB */}
                  <div className="w-64 h-20 border-2 border-blue-500 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-base font-medium">DynamoDB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 flex justify-center">
              <button className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-10 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-lg">
                Generate Terraform
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArchitectureRecommendationMockup;
