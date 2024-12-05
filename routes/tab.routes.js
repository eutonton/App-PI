import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home';
import Matter from '../Components/Matter';
import Conceitos from '../Components/Concepts';
import Avisos from '../Components/Avisos';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../AuthContext';  // Certifique-se de que o caminho esteja correto
import { Linking, TouchableOpacity, View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function ExternalLink() {
  const handlePress = () => {
    Linking.openURL('https://www.sp.senac.br/fale-com-a-gente');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={handlePress} style={{ padding: 10, backgroundColor: '#D93083', borderRadius: 5 }}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Acessar Fale com a Gente</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function TabRoutes() {
  const { user } = useAuth();  // Aqui você pode acessar o usuário

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Materias') {
            iconName = 'book';
          } else if (route.name === 'Conceitos') {
            iconName = 'clock-o';
          } else if (route.name === 'Avisos') {
            iconName = 'bell';
          } else if (route.name === 'Fale com a Gente') {
            iconName = 'envelope';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D93083',
        tabBarInactiveTintColor: '#656CEE',
      })}
    >
      <Tab.Screen name="Home" component={Home} initialParams={{ userData: user }} />
      <Tab.Screen name="Conceitos" component={Matter} />
      <Tab.Screen name="Avisos" component={Avisos} />
      <Tab.Screen name="Fale com a Gente" component={ExternalLink} />
    </Tab.Navigator>
  );
}
