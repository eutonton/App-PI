import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './stack.routes';
import { AuthProvider } from '../AuthContext'; 

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
