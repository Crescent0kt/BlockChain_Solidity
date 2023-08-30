// Header.js
import React from 'react';
import { Header } from "@rneui/base";
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const CustomHeader = ({ title, navigation, menu }) => {

  return (
    <Header
      backgroundColor="#ffffff"
      containerStyle={{
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        
      }}
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: title,
        style: { color: "#000000", fontSize: 30, fontWeight: 'bold', textAlign: 'center' }
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
      rightComponent={menu && (
        <Menu rendererProps={{ anchorStyle: { bottom: -20, right: -20 } }}>
          <MenuTrigger children={<Image source={require('../icon/burger-menu.png')} style={{ width: 30, height: 30 }} />} />
          <MenuOptions optionsContainerStyle={{
            backgroundColor: '#ffffff', width: 'auto',
            paddingVertical: '10%', paddingHorizontal: '5%'
          }}>
            <MenuOption onSelect={() => navigation.navigate('AddCareer')}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../icon/plus.png')} style={{ width: 20, height: 20 }} />
                <Text style={{ color: '#000000', fontSize: 20, textAlign: 'center', marginLeft: 5 }}>이력 등록</Text>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      )}

      rightContainerStyle={{ justifyContent: 'center' }}

      statusBarProps={{
        barStyle: "light-content",
        backgroundColor: "#ffffff",
        translucent: false
      }}

      linearGradientProps={{ justifyContent: 'center' }}
    />
  );
};

export default CustomHeader;
