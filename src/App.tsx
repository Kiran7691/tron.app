import React from 'react';
import { LandingScreen } from './components/LandingScreen';
import { MainInterface } from './components/MainInterface';
import { useStore } from './store';

function App() {
  const { currentStep } = useStore();

  return currentStep === 'landing' ? <LandingScreen /> : <MainInterface />;
}

export default App;