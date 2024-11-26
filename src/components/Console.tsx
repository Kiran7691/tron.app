import React from 'react';
import { Terminal } from 'lucide-react';

export const Console: React.FC = () => {
  return (
    <div className="h-full bg-gray-900">
      <div className="p-2 border-b border-gray-800 flex items-center">
        <Terminal className="w-4 h-4 mr-2" />
        Console
      </div>
      <div className="p-2 font-mono text-sm text-gray-400">
        <div>$ npm install</div>
        <div className="text-green-400">✓ Dependencies installed successfully</div>
        <div>$ npm run dev</div>
        <div className="text-blue-400">→ Local: http://localhost:5173</div>
      </div>
    </div>
  );
};