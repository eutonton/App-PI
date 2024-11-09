import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './AuthContext';

import Routes from './routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}
