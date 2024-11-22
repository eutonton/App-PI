import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home';
import Matter from '../Components/Matter';
import Conceitos from '../Components/Concepts';
import Avisos from '../Components/Avisos';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../AuthContext'; 

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const { user } = useAuth(); // Acesso ao usuário logado.

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
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D93083',
        tabBarInactiveTintColor: '#656CEE',
      })}
    >
      <Tab.Screen name="Avisos" component={Avisos} />
      <Tab.Screen name="Home" component={Home} initialParams={{ userData: user }} />
      <Tab.Screen name="Conceitos" component={Matter} />
    </Tab.Navigator>
  );
}