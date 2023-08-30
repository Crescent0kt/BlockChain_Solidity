import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddCareerScreen from '../components/screens/AddCareerScreen';
import LoginScreen from '../components/screens/LoginScreen';
import MainScreen from '../components/screens/MainScreen';
import AgreementScreen from '../components/screens/AgreementScreen';
import AgreementScreen2 from '../components/screens/AgreementScreen2';
import AgreementScreen3 from '../components/screens/AgreementScreen3';
import ShowAgreementScreen from '../components/screens/ShowAgreementScreen';
import ShowCareerScreen from '../components/screens/ShowCareerScreen';


//DELETE THIS!!!
import TestScreen from '../components/screens/TestScreen';
import { StackNavigatorParamList } from './types';


const Stack = createStackNavigator<StackNavigatorParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Main" component={MainScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Test" component={TestScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="AddCareer" component={AddCareerScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Agreement" component={AgreementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Agreement2" component={AgreementScreen2} options={{ headerShown: false }} />
        <Stack.Screen name="Agreement3" component={AgreementScreen3} options={{ headerShown: false }} />
        
        <Stack.Screen name="ShowAgreement" component={ShowAgreementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShowCareer" component={ShowCareerScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigation;
