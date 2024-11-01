import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabRoutes from './tab.routes';
import Login from '../Components/Login';
import Profile from '../Components/Profile';
import DrawerRoutes from './drawer.routes';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='login'
                component={Login}
            />

            <Stack.Screen
                name='Profile'
                component={Profile}

            />

        </Stack.Navigator>

    )
}