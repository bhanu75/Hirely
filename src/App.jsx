import React from 'react';
import { AuthProvider } from './context/Hirely';
import HirelyApp from './context/Hirely';

function App() {
  return (
    <AuthProvider>
      <HirelyApp />
    </AuthProvider>
  );
}

export default App;
