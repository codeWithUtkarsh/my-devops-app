import React, { useState } from 'react';
import LoginScreenMockup from './components/LoginScreenMockup';
import RepositoryDashboardMockup from './components/RepositoryDashboardMockup';
import RepositoryDashboardWithModal from './components/RepositoryDashboardWithModal';
import RecentProjectsDashboard from './components/RecentProjectsDashboard';
import RepositoryAnalysisScreen from './components/RepositoryAnalysisScreen';
import ArchitectureRecommendation from './components/ArchitectureRecommendation';
import TerraformEditorScreen from './components/TerraformEditorScreen';

const App = () => {
  const [currentView, setCurrentView] = useState('login');

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginScreenMockup onLogin={() => setCurrentView('repository')} />;
      case 'repository':
        return <RepositoryDashboardMockup onConnect={() => setCurrentView('modal')} />;
      case 'modal':
        return (
            <RepositoryDashboardWithModal
                onSelect={() => setCurrentView('projects')}
                onCancel={() => setCurrentView('repository')}
            />
        );
      case 'projects':
        return <RecentProjectsDashboard
            onConnectNew={() => setCurrentView('modal')}
            onEditProject={() => setCurrentView('terraform')}
        />;
      case 'analysis':
        return <RepositoryAnalysisScreen onBack={() => setCurrentView('projects')} repositoryName="serverless-api" />;
      case 'architecture':
        return <ArchitectureRecommendation onBack={() => setCurrentView('projects')} />;
      case 'terraform':
        return <TerraformEditorScreen onBack={() => setCurrentView('projects')} />;
      default:
        return <LoginScreenMockup onLogin={() => setCurrentView('repository')} />;
    }
  };

  // Navigation buttons for demo purposes
  const renderNavigation = () => {
    return (
        <div className="fixed bottom-4 left-4 bg-gray-900 p-2 rounded-lg border border-gray-800 z-50">
          <div className="flex gap-2">
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'login' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('login')}
            >
              Login
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'repository' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('repository')}
            >
              Connect Repo
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'modal' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('modal')}
            >
              Repo Modal
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'projects' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('projects')}
            >
              Projects
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'analysis' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('analysis')}
            >
              Analysis
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'architecture' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('architecture')}
            >
              Architecture
            </button>
            <button
                className={`px-3 py-1 rounded-md text-sm ${currentView === 'terraform' ? 'bg-accent-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                onClick={() => setCurrentView('terraform')}
            >
              Terraform
            </button>
          </div>
        </div>
    );
  };

  return (
      <div>
        {renderView()}
        {renderNavigation()}
      </div>
  );
};

export default App;