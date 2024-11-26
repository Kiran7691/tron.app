import React from 'react';
import { Chrome, MonitorSmartphone, Globe } from 'lucide-react';
import { useStore } from '../store';

export const BrowserSelector: React.FC = () => {
  const { browserCompatibility, setBrowserCompatibility } = useStore();

  return (
    <div className="flex space-x-4">
      {[
        { id: 'chrome', icon: Chrome, label: 'Chrome' },
        { id: 'firefox', icon: Globe, label: 'Firefox' },
        { id: 'safari', icon: MonitorSmartphone, label: 'Safari' },
      ].map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setBrowserCompatibility(id)}
          className={`p-1 rounded flex items-center gap-2 ${
            browserCompatibility === id
              ? 'text-blue-400 bg-blue-400/10'
              : 'text-gray-500 hover:text-gray-400'
          }`}
          title={label}
        >
          <Icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};