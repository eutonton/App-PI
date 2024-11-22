import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';
import Login from '../Components/Login';
import Units from '../Components/Units';
import DrawerRoutes from './drawer.routes';
import Concepts from '../Components/Concepts'; 
import { useAuth } from '../AuthContext'; 

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const { user } = useAuth(); // Verifica se o usuário está autenticado.

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Quando o usuário está logado, mostre as telas principais.
        <>
          <Stack.Screen name="Home" component={DrawerRoutes} />
          <Stack.Screen 
            name="Concepts" 
            component={Concepts} 
            options={{ headerShown: true, title: 'Escolha a Unidade' }}
          />
          <Stack.Screen name="Units" component={Units} />
        </>
      ) : (
        // Caso contrário, exiba a tela de login.
        <Stack.Screen name="login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
