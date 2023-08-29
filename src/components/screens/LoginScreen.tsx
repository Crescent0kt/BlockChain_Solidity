import React, { FC } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../../navigation/types';
import { Text } from '@rneui/themed';
import CustomButton from '../common/CustomButton';
import styled from 'styled-components/native';

interface LoginScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamList, 'Login'>;
}

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {

  //GOTO main
  const onButtonClick = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };
  
  const onButtonClick2 = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };
  
  return (
      <MainContainer>
         <Text h1>Chain Work</Text>


         <ButtonContainer>
         <CustomButton
             title="Sign in"
             type="login"
             onPress={() => onButtonClick()}
           />
           <CustomButton
             title="Sign up"
             type="login"
             onPress={() => onButtonClick2()}/>
         </ButtonContainer>
       </MainContainer>
   );
};


export default LoginScreen;



const MainContainer = styled.View`
 flex-grow :1;
 justify-content:center;
 align-items:center;
 background-color:#FFFFFF;
`;


const ButtonContainer = styled.View`
 justify-content:center;
 margin-top :100px ;
`;
