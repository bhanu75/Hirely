import React from 'react';
import { AuthProvider } from './context/Hirely-job-portal';
import HirelyApp from './context/Hirely-job-portal';

function App() {
  return (
    <AuthProvider>
      <Hirely-job-portal/>
    </AuthProvider>
  );
}

export default App;
