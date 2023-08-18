import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import ManageAttendanceScreen from './ManageAttendanceScreen';
import ManageBusinessScreen from './ManageBusinessScreen';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen name="Main" component={MainScreen} />
                <Stack.Screen name="ManageAttendance" component={ManageAttendanceScreen} />
                <Stack.Screen name="ManageBusiness" component={ManageBusinessScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;