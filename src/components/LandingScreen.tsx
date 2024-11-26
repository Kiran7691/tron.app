import React, { useState } from 'react';
import { ArrowRight, Sparkles, Menu, Clock, Settings, LogOut, ChevronRight, Circle } from 'lucide-react';
import { useStore } from '../store';

const recentProjects = [
  { name: 'E-commerce Testing Suite', timestamp: '2 hours ago', status: 'active' },
  { name: 'Banking API Tests', timestamp: '1 day ago', status: 'completed' },
  { name: 'CRM Automation', timestamp: '3 days ago', status: 'failed' },
  { name: 'Mobile App Testing', timestamp: '1 week ago', status: 'completed' }
];

export const LandingScreen: React.FC = () => {
  const { prompt, setPrompt, setStep } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNext = () => {
    if (prompt.trim()) {
      setStep('main');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-400';
      case 'completed': return 'text-green-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex">
      {/* Side Navigation */}
      <div 
        className={`fixed top-0 left-0 h-full bg-gray-900 transform transition-all duration-300 ease-in-out z-50 
          ${isMenuOpen ? 'w-64 translate-x-0' : 'w-16 translate-x-0'}`}
        onMouseEnter={() => setIsMenuOpen(true)}
        onMouseLeave={() => setIsMenuOpen(false)}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Menu className="w-6 h-6 text-gray-400" />
            <span className={`text-white font-medium transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
              Menu
            </span>
          </div>
        </div>

        <div className={`mt-8 transition-opacity duration-200 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Recent Projects
            </h3>
            <div className="mt-4 space-y-2">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors group cursor-pointer"
                >
                  <Circle className={`w-2 h-2 mr-3 ${getStatusColor(project.status)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200 truncate">
                      {project.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {project.timestamp}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 p-4 space-y-2 transition-opacity duration-200 
          ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-16">
        <header className="p-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Tron.AI
            </span>
            <a 
              href="https://prizmora.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
            >
              powered by prizmora
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full space-y-8">
            <h1 className="text-5xl font-bold text-white text-center">
              What do you want to build?
            </h1>
            <p className="text-gray-400 text-center text-lg">
              Prompt, run, edit, and deploy Automation framework.
            </p>
            <div className="relative">
              <Sparkles className="absolute left-4 top-6 text-blue-400" />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your project..."
                className="w-full h-32 px-12 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleNext();
                  }
                }}
              />
              <button
                onClick={handleNext}
                className="absolute right-4 top-6 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            </div>
            <p className="text-center text-sm text-gray-500">
              Press Enter to continue, Shift + Enter for new line
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};