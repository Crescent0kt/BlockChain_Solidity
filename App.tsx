import React from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import { View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
const App = () => {
  return (
    <MenuProvider>
      <View style = {{flex:1}}>
        <AppNavigation />
      </View>
    </MenuProvider>
  );
};

export default App;