import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking, TouchableOpacity, View, Text } from 'react-native';
import Aulas from '../Components/Aulas';

import TabRoutes from './tab.routes';
import Profile from '../Components/Profile';
import Avisos from '../Components/Avisos';

const Drawer = createDrawerNavigator();

function ExternalLink() {
  const handlePress = () => {
    Linking.openURL('https://www.sp.senac.br/fale-com-a-gente');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa', // Fundo neutro e claro
        paddingHorizontal: 20, // Espaço interno nas laterais
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={{
          paddingVertical: 15, // Espaço vertical
          paddingHorizontal: 20, // Espaço horizontal
          backgroundColor: '#D93083', // Cor vibrante
          borderRadius: 10, // Cantos arredondados
          shadowColor: '#000', // Cor da sombra
          shadowOffset: { width: 0, height: 2 }, // Posição da sombra
          shadowOpacity: 0.3, // Opacidade da sombra
          shadowRadius: 5, // Raio da sombra
          elevation: 5, // Sombra no Android
        }}
      >
        <Text
          style={{
            color: '#ffffff', // Texto em branco
            fontSize: 18, // Tamanho do texto maior
            fontWeight: '600', // Negrito médio
            textAlign: 'center', // Centralizar texto
            textTransform: 'uppercase', // Texto em maiúsculas
          }}
        >
          Fale com a Gente
        </Text>
      </TouchableOpacity>
    </View>
  );

}

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

      <Drawer.Screen
        name="Aulas"
        component={Aulas}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="clock" color={color} size={size} />, // Substituí 'Aulas' por 'book'
          drawerLabel: 'Horários', // Ajustado para o português correto
        }}
      />
      
      <Drawer.Screen
        name="Link"
        component={ExternalLink}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="link" color={color} size={size} />,
          drawerLabel: 'Fale com a Gente',
        }}
      />




    </Drawer.Navigator>
  );
}
