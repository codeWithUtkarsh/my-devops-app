import React from 'react';

const AnalysisScreen = () => {
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
              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full bg-accent-500 flex items-center justify-center">
            JD
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Analyzing Repository</h2>
          <p className="text-gray-400 text-center mb-6">Examining code structure for AWS serverless potential</p>

          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            {/* Step 1 */}
            <div className="flex items-center p-4 border border-gray-800 rounded-lg bg-gray-900 hover:border-accent-500 transition-colors">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="flex-1">Cloning Repository <span className="text-gray-400 block text-xs">Completed in 1.2s</span></span>
            </div>

            {/* Step 2 */}
            <div className="flex items-center p-4 border border-gray-800 rounded-lg bg-gray-900 relative hover:border-accent-500 transition-colors">
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-3 relative">
                <div className="absolute inset-0 border-t-2 border-white animate-spin rounded-full"></div>
              </div>
              <span className="flex-1">Analyzing Codebase <span className="text-gray-400 block text-xs">In progress...</span></span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center p-4 border border-gray-800 rounded-lg bg-gray-900 opacity-60">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">3</div>
              <span className="flex-1">Identifying Application Type <span className="text-gray-400 block text-xs">Pending</span></span>
            </div>

            {/* Step 4 */}
            <div className="flex items-center p-4 border border-gray-800 rounded-lg bg-gray-900 opacity-60">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">4</div>
              <span className="flex-1">Detecting Dependencies <span className="text-gray-400 block text-xs">Pending</span></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Overall Progress</span>
              <span className="text-gray-300">25%</span>
            </div>
            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-accent-500 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-md flex items-center gap-1 text-sm transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cancel Analysis
            </button>
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

export default AnalysisScreen;
