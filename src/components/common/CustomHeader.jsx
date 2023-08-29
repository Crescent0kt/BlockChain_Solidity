// Header.js
import React from 'react';
import { Header } from "@rneui/base";
import { View, TouchableOpacity, Image,Text } from 'react-native';

const CustomHeader = ({title, navigation,search }) => {
  
  return (
    <Header
      backgroundColor="#ffffff"
      containerStyle={{ borderBottomWidth: 2,
        borderBottomColor: '#000000', }}
      backgroundImageStyle={{}}
      barStyle="default"

      centerComponent={{
        text: title,
        style: { color: "#000000", fontSize: 30, fontWeight: 'bold' }
      }}
      centerContainerStyle={{ justifyContent: 'center' }}


      leftComponent={
        <View>
           <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Image
              source={require('../icon/home.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
      }
      leftContainerStyle={{ justifyContent: 'center' }}

      rightComponent={
        search && ( 
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <Image
              source={require('../icon/magnifying-glass.png')}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        )
      }
      rightContainerStyle={{ justifyContent: 'center' }}
      statusBarProps={{ 
        barStyle:"light-content", 
        backgroundColor:"#ffffff", 
        translucent:false 
     }}

      linearGradientProps={{ justifyContent: 'center' }}
      placement="center"


    />
  );
};

export default CustomHeader;
