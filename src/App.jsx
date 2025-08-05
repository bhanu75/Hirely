import React from 'react';
import { AuthProvider } from './context/hirely-job-portal';
import HirelyApp from './context/hirely-job-portal';

function App() {
  return (
    <AuthProvider>
      <HirelyApp />
    </AuthProvider>
  );
}

export default App;
