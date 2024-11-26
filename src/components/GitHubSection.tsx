import React, { useState } from 'react';
import { Github, GitBranch, GitCommit, CloudOff, ChevronRight, ChevronDown } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-b border-[#404040] bg-[#252526]">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-[#2d2d2d] transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Github className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">Source Control</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Not Connected</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>
      
      {isExpanded && (
        <div className="p-3 space-y-3 border-t border-[#404040] bg-[#1e1e1e]">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>Create Repository</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
            <div className="flex items-center space-x-2">
              <GitCommit className="w-4 h-4" />
              <span>Publish to GitHub</span>
            </div>
          </button>

          <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500">
            <CloudOff className="w-4 h-4" />
            <span>Working Locally</span>
          </div>
        </div>
      )}
    </div>
  );
};