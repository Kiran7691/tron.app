import React from 'react';
import { Save, GitFork, Share2, Github } from 'lucide-react';

export const ActionBar: React.FC = () => {
  return (
    <div className="border-b border-[#404040] bg-[#2d2d2d] p-2 space-y-2">
      <button className="w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
        <Save className="w-4 h-4" />
        <span>Save Project</span>
      </button>
      <button className="w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
        <GitFork className="w-4 h-4" />
        <span>Fork Project</span>
      </button>
      <button className="w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
        <Share2 className="w-4 h-4" />
        <span>Share Project</span>
      </button>
      <button className="w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#404040] hover:text-white transition-colors">
        <Github className="w-4 h-4" />
        <span>Create Repository</span>
      </button>
    </div>
  );
};