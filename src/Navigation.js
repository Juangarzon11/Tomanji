import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"

import Home from './screens/Home'
import Add from './screens/Add'
import Edit from './screens/Edit'
import Historial from './screens/Historial'
import AddEvent from './screens/AddEvent'
import EventPlayers from "./screens/EventPlayers"

const Stack = createNativeStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={Home}
            />
            <Stack.Screen
                name="Add"
                component={Add}
                options={{presentation: 'modal'}}
            />
            <Stack.Screen
                name="Edit"
                component={Edit}
                options={{presentation: 'modal'}}
            />
            <Stack.Screen
                name="AddEvent"
                component={AddEvent}
                options={{presentation: 'modal'}}
            />
            <Stack.Screen
                name="Historial"
                component={Historial}
            />
            <Stack.Screen
                name="EventPlayers"
                component={EventPlayers}
            />
        </Stack.Navigator>
    )
}

function Navigation() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

export default Navigation