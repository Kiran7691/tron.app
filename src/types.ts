export interface FileStructure {
  name: string;
  type: 'file' | 'directory';
  children?: FileStructure[];
  content?: string;
}

export interface AppState {
  currentStep: 'landing' | 'main';
  prompt: string;
  selectedFile: string | null;
  fileExplorerOpen: boolean;
  consoleOpen: boolean;
  browserCompatibility: string;
  theme: 'dark' | 'light';
  setStep: (step: 'landing' | 'main') => void;
  setPrompt: (prompt: string) => void;
  setSelectedFile: (file: string | null) => void;
  toggleFileExplorer: () => void;
  toggleConsole: () => void;
  setBrowserCompatibility: (browser: string) => void;
  toggleTheme: () => void;
}