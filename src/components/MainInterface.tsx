import React, { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { FileExplorer } from './FileExplorer';
import { CodeEditor } from './CodeEditor';
import { Console } from './Console';
import { BrowserSelector } from './BrowserSelector';
import { Preview } from './Preview';
import { Header } from './Header';
import { GitHubSection } from './GitHubSection';
import { ChatInterface } from './ChatInterface';
import { useStore } from '../store';
import { ToggleLeft, GripVertical } from 'lucide-react';

const ResizeHandle = () => (
  <PanelResizeHandle className="w-2 hover:w-2 group relative">
    <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-px bg-[#404040] group-hover:bg-blue-500 transition-colors" />
    <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center w-4 h-8 my-auto bg-[#2d2d2d] border border-[#404040] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
      <GripVertical className="w-3 h-3 text-gray-400" />
    </div>
  </PanelResizeHandle>
);

export const MainInterface: React.FC = () => {
  const { fileExplorerOpen, consoleOpen } = useStore();
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel - Chat Interface */}
          <Panel defaultSize={25} minSize={20} maxSize={40}>
            <div className="h-full border-r border-[#404040] flex flex-col bg-[#252526]">
              <ChatInterface />
            </div>
          </Panel>

          <ResizeHandle />

          {/* Middle Panel - File Explorer */}
          <Panel defaultSize={15} minSize={10} maxSize={30}>
            <div className="h-full border-r border-[#404040] bg-[#252526]">
              <GitHubSection />
              <div className="flex-1 overflow-auto">
                <FileExplorer />
              </div>
            </div>
          </Panel>

          <ResizeHandle />

          {/* Right Panel - Preview/Code */}
          <Panel defaultSize={60}>
            <div className="h-full flex flex-col">
              <div className="h-12 border-b border-[#404040] flex items-center justify-between px-4 bg-[#2d2d2d]">
                <BrowserSelector />
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <ToggleLeft className={`w-4 h-4 ${showPreview ? 'rotate-180' : ''} transition-transform`} />
                  <span className="text-sm">{showPreview ? 'Preview' : 'Code'}</span>
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {showPreview ? <Preview /> : <CodeEditor />}
              </div>
              {consoleOpen && (
                <div className="h-48 border-t border-[#404040] bg-[#1e1e1e]">
                  <Console />
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};