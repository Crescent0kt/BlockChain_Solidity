import React, { FC } from 'react';
import { FlatList, StyleSheet, View,Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../../navigation/types';
import { Button, withTheme, Text } from '@rneui/themed';
import CustomHeader from '../common/CustomHeader';
import styled from 'styled-components/native';


const columnWidth = Dimensions.get('window').width / 4;

interface ShowCareerScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamList, 'ShowCareer'>;
}

interface Data {
  id: string;
  colA: string;
  colB: string;
  colC: string;
}

interface ItemProps extends Data { 
  navigation: StackNavigationProp<StackNavigatorParamList, 'ShowCareer'>;
}

const DATA: Data[] = [
  { id: '1', colA: '회사 A', colB: '300일', colC: '완료' },
  { id: '2', colA: '회사 B', colB: '300일', colC: '완료' },
  { id: '3', colA: '회사 C', colB: '300일', colC: '미완료' },
  { id: '4', colA: '회사 D', colB: '300일', colC: '완료' },
  { id: '5', colA: '회사 E', colB: '300일', colC: '완료' },
  { id: '6', colA: '회사 F', colB: '300일', colC: '완료' },
  { id: '7', colA: '회사 G', colB: '300일', colC: '미완료' },
  { id: '8', colA: '회사 H', colB: '300일', colC: '완료' },
  { id: '9', colA: '회사 I', colB: '300일', colC: '미완료' },
  { id: '10', colA: '회사 J', colB: '300일', colC: '미완료' },
  { id: '11', colA: '회사 K', colB: '300일', colC: '완료' },
  { id: '12', colA: '회사 L', colB: '300일', colC: '완료' },
  { id: '13', colA: '회사 M', colB: '300일', colC: '완료' },
  { id: '14', colA: '회사 N', colB: '300일', colC: '완료' },
  { id: '15', colA: '회사 O', colB: '300일', colC: '완료' },
  { id: '16', colA: '회사 P', colB: '300일', colC: '미완료' },
];

const Item: FC<ItemProps> = ({ id, colA, colB, colC,navigation}) => {
  const handleButtonClick = () => {
    //1. 이력을 불러온다.
    //2. 이력을 조회한다.
    console.log(id);
      navigation.navigate('ShowAgreement', {
        employee: '홍길동',
        employer: '회사이름',
  
        start_year: 2023,
        start_month: 9,
        start_day: 27,
  
        end_year: 2024,
        end_month: 9,
        end_day: 27,
  
        location: '서울특별시 강남구',
        job: '소프트웨어 엔지니어',
  
        start_time: 100,
        end_time: 200,
  
        start_restTime: 120,
        end_restTime: 130,
  
        work_day: 5,
        holiday: '주말',
  
        salary: 1,
        payment: 3000000,
  
        hasBonus: true,
        bonus: 200000,
  
        hasOther: true,
        other_salary: '복지 및 체력단련비 100000',
  
        payCheck: 1,
        pay_day: "25",
  
        account: true,
  
        insurance1: true,
        insurance2: true,
        insurance3: true,
        insurance4: false,
  
        create_time: '2023-08-24',
      })
  };

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{colA}</Text>
      <Text style={styles.itemText}>{colB}</Text>
      <Text style={styles.itemText}>{colC}</Text>
      <View style={{ width: columnWidth, alignItems: "center" }}>
        <Button
          title={'조회'}
          size='sm'
          buttonStyle={{
            backgroundColor: 'rgba(111, 202, 186, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 5,
            width: 50

          }}
          onPress={handleButtonClick}
        />
      </View>

    </View >
  );
};



const ShowCareerScreen: FC<ShowCareerScreenProps> = ({ navigation }) => {


  const renderItem = ({ item }: { item: Data }) => (
    <Item id={item.id} colA={item.colA} colB={item.colB} colC={item.colC} navigation={navigation} />
  );

  return (
    <MainContainer>
      <CustomHeader title="이력조회" navigation = {navigation} search = {true} />
      <HeaderContainer>
        <ItemText>근무지</ItemText>
        <ItemText>근무 기간</ItemText>
        <ItemText>인증</ItemText>
        <ItemText>조회</ItemText>
      </HeaderContainer>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item: Data) => item.id}
      />
    </MainContainer >
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'lightblue',
    borderBottomColor : 'black',

  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    width: columnWidth,
  },
});

export default ShowCareerScreen;


const MainContainer = styled.View`
    flex: 1;
    background-color:#ffffff;

    `;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  background-color: lightblue;

`;

const ItemText = styled.Text`
  font-size: 16px;
  text-align: center;
  width: ${columnWidth}px;
  font-weight: bold;
`;