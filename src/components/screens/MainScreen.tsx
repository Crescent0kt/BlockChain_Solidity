// 1. 필요한 라이브러리 및 파일 가져오기
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../../navigation/types';
import { Button, Text } from '@rneui/themed';
import CustomHeader from '../common/CustomHeader';
import styled from 'styled-components/native';

// 2. 타입 및 인터페이스 정의
interface MainScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamList, 'Main'>;
}

// 추가: 버튼 클릭 시 실행될 함수들 



// 3. 화면 컴포넌트 작성
const MainScreen: FC<MainScreenProps> = ({ navigation }) => {
  const handleButton1 = () => {
    console.log("이거 안할래..");
};

const handleButton2 = () => {
  navigation.navigate('Agreement');
};

const handleButton3 = () => {
  navigation.navigate('ShowCareer');
};

const handleButton4 = () => {
  console.log("승복이 화이팅");
};
return (
    <MainContainer>
        <CustomHeader title="Chain Work" navigation={navigation} menu={false} />
        <View style = {{marginBottom:"30%"}}></View>
        <ButtonContainer>
          
            <ColorfulButtons style={{backgroundColor: '#FFD4B2'}} onPress={handleButton1}><ButtonText>내 정보</ButtonText></ColorfulButtons>
            <ColorfulButtons style={{backgroundColor: '#FFD060'}} onPress={handleButton2}><ButtonText>근로계약서 작성</ButtonText></ColorfulButtons>
            <ColorfulButtons style={{backgroundColor: '#CEEDC7'}} onPress={handleButton3}><ButtonText>이력 조회</ButtonText></ColorfulButtons>
            <ColorfulButtons style={{backgroundColor: '#86C8BC'}} onPress={handleButton4}><ButtonText>근태 관리</ButtonText></ColorfulButtons>
        </ButtonContainer>
    </MainContainer>
);
};

export default MainScreen;
const MainContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  justifyContent: 'center';
  alignItems: 'center';
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


const ColorfulButtons = styled.TouchableOpacity`
width :45%;
height :20%;
margin :10px;
border-radius :10px;
justify-content:center;
align-items:center;
`;


const ButtonText=styled.Text`
color:#000000;
font-size:25px;
`;

