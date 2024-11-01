import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Components/Home';
import Login from '../Components/Login';

const Tab = createBottomTabNavigator();


export default function TabRoutes() {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home"
                component={Home} />

            <Tab.Screen name="Login"
                component={Login} />

           
        </Tab.Navigator>
    );
}
