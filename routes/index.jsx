import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerRoutes from './drawer.routes'; // Verifique se o caminho está correto
import Login from '../Components/Login'; // Certifique-se de que o caminho está correto para o arquivo Login.js

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={DrawerRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
