import { createNativeStackNavigator } from '@react-navigation/stack';

import TabRoutes from './tab.routes';
import Login from '../Components/Login';

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{title: '' }}>
            <Stack.Screen
                name='login'
                component={Login}
               
            />
        </Stack.Navigator>

    )
}