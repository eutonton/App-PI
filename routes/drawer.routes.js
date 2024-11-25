import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import TabRoutes from './tab.routes';
import Profile from '../Components/Profile';
import Avisos from '../Components/Avisos';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    

<Drawer.Navigator
  screenOptions={{
    title: '',
    drawerActiveBackgroundColor: '#90e0ef', // Fundo do item ativo no menu
    drawerActiveTintColor: '#03045e', // Cor do texto no item ativo
    drawerInactiveTintColor: '#023e8a', // Cor do texto no item inativo
    drawerLabelStyle: { fontSize: 16, fontWeight: 'bold' }, // Estilo do texto
    drawerStyle: {
      backgroundColor: '#f1f5f9', // Cor de fundo do menu
      width: 250, // Largura do menu
    },
    // Alterando o estilo da barra superior (header)
    headerStyle: {
      backgroundColor: '#D93083', // Cor de fundo do header
    },
    headerTintColor: '#ffffff', // Cor do texto no header
    headerTitleStyle: {
      fontWeight: 'bold', // Estilo do texto do título
    },
  }}
>
      {/* Rota para a página inicial */}
      <Drawer.Screen
        name="feed"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          drawerLabel: 'Início',
        }}
      />

      {/* Rota para o perfil do usuário */}
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
          drawerLabel: 'Perfil',
        }}
      />


    </Drawer.Navigator>
  );
}
