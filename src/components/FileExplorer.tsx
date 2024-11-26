import React, { useState } from 'react';
import { Folder, File, ChevronDown, ChevronRight, GitBranch, GitCommit, GitMerge } from 'lucide-react';
import { useStore } from '../store';
import { FileStructure } from '../types';

const projectFiles: FileStructure = {
  name: 'banking-app-automation',
  type: 'directory',
  children: [
    {
      name: 'src',
      type: 'directory',
      children: [
        {
          name: 'main',
          type: 'directory',
          children: [
            {
              name: 'java',
              type: 'directory',
              children: [
                {
                  name: 'com',
                  type: 'directory',
                  children: [
                    {
                      name: 'banking',
                      type: 'directory',
                      children: [
                        {
                          name: 'api',
                          type: 'directory',
                          children: [
                            { name: 'AccountAPITest.java', type: 'file' },
                            { name: 'TransactionAPITest.java', type: 'file' },
                            { name: 'UserAPITest.java', type: 'file' }
                          ]
                        },
                        {
                          name: 'base',
                          type: 'directory',
                          children: [
                            { name: 'BaseAPI.java', type: 'file' },
                            { name: 'TestBase.java', type: 'file' },
                            { name: 'BasePage.java', type: 'file' }
                          ]
                        },
                        {
                          name: 'pages',
                          type: 'directory',
                          children: [
                            { name: 'LoginPage.java', type: 'file' },
                            { name: 'DashboardPage.java', type: 'file' },
                            { name: 'AccountsPage.java', type: 'file' },
                            { name: 'TransactionsPage.java', type: 'file' },
                            { name: 'ProfilePage.java', type: 'file' }
                          ]
                        },
                        {
                          name: 'utils',
                          type: 'directory',
                          children: [
                            { name: 'RestAssuredConfig.java', type: 'file' },
                            { name: 'WebDriverManager.java', type: 'file' },
                            { name: 'ConfigReader.java', type: 'file' },
                            { name: 'ExcelUtils.java', type: 'file' },
                            { name: 'TestListener.java', type: 'file' },
                            { name: 'ExtentReportManager.java', type: 'file' },
                            { name: 'WaitUtils.java', type: 'file' }
                          ]
                        },
                        {
                          name: 'constants',
                          type: 'directory',
                          children: [
                            { name: 'Constants.java', type: 'file' }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'resources',
              type: 'directory',
              children: [
                { name: 'config.properties', type: 'file' },
                { name: 'log4j2.xml', type: 'file' }
              ]
            }
          ]
        },
        {
          name: 'test',
          type: 'directory',
          children: [
            {
              name: 'java',
              type: 'directory',
              children: [
                {
                  name: 'com',
                  type: 'directory',
                  children: [
                    {
                      name: 'banking',
                      type: 'directory',
                      children: [
                        {
                          name: 'tests',
                          type: 'directory',
                          children: [
                            { name: 'LoginTest.java', type: 'file' },
                            { name: 'AccountsTest.java', type: 'file' },
                            { name: 'TransactionsTest.java', type: 'file' },
                            { name: 'ProfileTest.java', type: 'file' }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: 'resources',
              type: 'directory',
              children: [
                { name: 'testdata.xlsx', type: 'file' },
                { name: 'testng.xml', type: 'file' }
              ]
            }
          ]
        }
      ]
    },
    { name: 'pom.xml', type: 'file' },
    { name: '.gitignore', type: 'file' },
    { name: 'README.md', type: 'file' }
  ]
};

export const FileExplorer: React.FC = () => {
  const { setSelectedFile } = useStore();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['banking-app-automation']));
  const [activeTab, setActiveTab] = useState<'files' | 'source-control'>('files');

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const renderTree = (node: FileStructure, path = '') => {
    const currentPath = path ? `${path}/${node.name}` : node.name;
    const isExpanded = expandedFolders.has(currentPath);
    const depth = path.split('/').length;

    return (
      <div key={currentPath}>
        <div
          className={`flex items-center py-1 px-2 hover:bg-[#37373d] cursor-pointer group ${
            depth === 0 ? 'sticky top-0 bg-[#252526] z-10' : ''
          }`}
          style={{ paddingLeft: `${depth * 1.25}rem` }}
          onClick={() => {
            if (node.type === 'directory') {
              toggleFolder(currentPath);
            } else {
              setSelectedFile(node.name);
            }
          }}
        >
          {node.type === 'directory' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 mr-1 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1 text-gray-400" />
              )}
              <Folder className="w-4 h-4 mr-2 text-blue-400" />
            </>
          ) : (
            <File className="w-4 h-4 mr-2 text-gray-400" />
          )}
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
            {node.name}
          </span>
        </div>
        {isExpanded && node.children?.map((child) => renderTree(child, currentPath))}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[#404040]">
        <div className="flex">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'files'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('files')}
          >
            Files
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium ${
              activeTab === 'source-control'
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('source-control')}
          >
            Source Control
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {activeTab === 'files' ? (
          <div className="flex-1">
            {renderTree(projectFiles)}
          </div>
        ) : (
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Current Branch</span>
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-4 h-4 text-blue-400" />
                  <span className="text-white">main</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#37373d] cursor-pointer group">
                  <GitCommit className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  <span className="text-sm text-gray-400 group-hover:text-white">2 changes</span>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-[#37373d] cursor-pointer group">
                  <GitMerge className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  <span className="text-sm text-gray-400 group-hover:text-white">0 conflicts</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#404040]">
                <button className="w-full px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                  Commit Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};