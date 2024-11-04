import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home';
import Matter from '../Components/Matter';
import Horarios from '../Components/Horarios';
import Avisos from '../Components/Avisos';
import Profile from '../Components/Profile';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando FontAwesome

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    // Definindo ícones para cada aba
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Materias') {
                        iconName = 'book';
                    } else if (route.name === 'Horarios') {
                        iconName = 'clock-o';
                    } else if (route.name === 'Avisos') {
                        iconName = 'bell';
                    }

                    // Retornando o ícone correspondente
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#D93083',  // Cor ativa
                tabBarInactiveTintColor: '#656CEE',   // Cor inativa
            })}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Materias" component={Matter} />
            <Tab.Screen name="Horarios" component={Horarios} />
            <Tab.Screen name="Avisos" component={Avisos} />
            
        </Tab.Navigator>
    );
}
