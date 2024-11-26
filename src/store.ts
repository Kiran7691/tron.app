import { create } from 'zustand';
import { AppState } from './types';

export const useStore = create<AppState>((set) => ({
  currentStep: 'landing',
  prompt: '',
  selectedFile: null,
  fileExplorerOpen: true,
  consoleOpen: true,
  browserCompatibility: 'chrome',
  theme: 'dark',
  setStep: (step) => set({ currentStep: step }),
  setPrompt: (prompt) => set({ prompt }),
  setSelectedFile: (file) => set({ selectedFile: file }),
  toggleFileExplorer: () => set((state) => ({ fileExplorerOpen: !state.fileExplorerOpen })),
  toggleConsole: () => set((state) => ({ consoleOpen: !state.consoleOpen })),
  setBrowserCompatibility: (browser) => set({ browserCompatibility: browser }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));