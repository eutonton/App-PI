import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';
import Login from '../Components/Login';
import Units from '../Components/Units';
import DrawerRoutes from './drawer.routes';
import Concepts from '../Components/Concepts'; // Adicionando a tela de conceitos

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Tela de Login */}
            <Stack.Screen
                name="login"
                component={Login}
            />

            {/* Rotas da Home (Drawer e Tabs) */}
            <Stack.Screen
                name="Home"
                component={DrawerRoutes}
            />

            {/* Tela de Conceitos */}
            <Stack.Screen
                name="Concepts"
                component={Concepts}
                options={{
                    headerShown: true,
                    title: 'Escolha a Unidade',
                }}

            />

            <Stack.Screen
                name="Units"
                component={Units} />
            </Stack.Navigator>
    );
}
