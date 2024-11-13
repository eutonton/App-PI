import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home';
import Matter from '../Components/Matter';
import Horarios from '../Components/Horarios';
import Avisos from '../Components/Avisos';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../AuthContext';  // Certifique-se de que o caminho esteja correto

const Tab = createBottomTabNavigator();

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
          } else if (route.name === 'Horarios') {
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
      <Tab.Screen name="Home" component={Home} initialParams={{ userData: user }} />
      <Tab.Screen name="Materias" component={Matter} />
      <Tab.Screen name="Horarios" component={Horarios} />
      <Tab.Screen name="Avisos" component={Avisos} />
    </Tab.Navigator>
  );
}
