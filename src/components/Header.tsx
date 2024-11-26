import React, { useState, useEffect } from 'react';
import { Save, GitFork, Share2, Menu, Settings, ArrowLeft, TestTube, Network, FileBarChart, Download, LogOut, History, Folder, Sun, Moon } from 'lucide-react';
import { useStore } from '../store';

export const Header: React.FC = () => {
  const { setStep, theme, toggleTheme } = useStore();
  const [showTestingMenu, setShowTestingMenu] = useState(false);

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('Framework files would be here'));
    element.setAttribute('download', 'banking-app-automation.zip');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Update body class when theme changes
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="h-12 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] flex items-center px-2">
      <button 
        onClick={() => setStep('landing')}
        className="p-2 hover:bg-[var(--bg-secondary)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label="Go back to landing page"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      
      <div className="relative">
        <button 
          className="flex items-center p-2 hover:bg-[var(--bg-secondary)] rounded ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          onClick={() => setShowTestingMenu(!showTestingMenu)}
          aria-expanded={showTestingMenu}
          aria-haspopup="true"
        >
          <Menu className="w-4 h-4 mr-1.5" />
          <span className="text-sm">Menu</span>
        </button>

        {showTestingMenu && (
          <div 
            className="absolute left-2 top-full mt-1 w-48 bg-[var(--bg-secondary)] rounded-md shadow-lg border border-[var(--border-color)] py-1 z-50"
            role="menu"
          >
            <button className="w-full flex items-center px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]" role="menuitem">
              <TestTube className="w-4 h-4 mr-2" />
              UI Testing
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]" role="menuitem">
              <Network className="w-4 h-4 mr-2" />
              API Testing
            </button>
            <button className="w-full flex items-center px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]" role="menuitem">
              <FileBarChart className="w-4 h-4 mr-2" />
              Reports
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center ml-4 space-x-1 px-2 py-1 bg-[var(--bg-secondary)] rounded-md">
        <Folder className="w-4 h-4 text-[var(--accent-color)]" />
        <span className="text-sm text-[var(--text-secondary)]">banking-app-automation</span>
      </div>

      <div className="flex space-x-4 ml-4">
        <button className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded">File</button>
        <button className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded">Edit</button>
        <button className="px-3 py-1 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] rounded">View</button>
      </div>

      <div className="flex-1" />

      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-[var(--bg-secondary)] rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <button 
          onClick={handleDownload}
          className="p-2 hover:bg-[var(--bg-secondary)] rounded flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          aria-label="Download project files"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm">Download</span>
        </button>
        <button 
          className="p-2 hover:bg-[var(--bg-secondary)] rounded"
          aria-label="Save project"
        >
          <Save className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
        <button 
          className="p-2 hover:bg-[var(--bg-secondary)] rounded"
          aria-label="Fork project"
        >
          <GitFork className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
        <button 
          className="p-2 hover:bg-[var(--bg-secondary)] rounded"
          aria-label="Share project"
        >
          <Share2 className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
      </div>
    </div>
  );
};