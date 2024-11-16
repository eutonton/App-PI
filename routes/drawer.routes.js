import { createDrawerNavigator } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons'

import TabRoutes from './tab.routes';
import Profile from '../Components/Profile';
import Avisos from '../Components/Avisos';
import Home from '../Components/Home';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator screenOptions={{ title: '' }}>

            <Drawer.Screen
                name='feed'
                component={TabRoutes}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
                    drawerLabel: 'Início'
                }}
            />

            <Drawer.Screen
                name='profile'
                component={Profile}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    drawerLabel: 'Meu Perfil'
                }}
            />

            <Drawer.Screen
                name='avisos'
                component={Avisos}
                options={{
                    drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
                    drawerLabel: 'Avisos'
                }}
            />
        </Drawer.Navigator>

    )
}