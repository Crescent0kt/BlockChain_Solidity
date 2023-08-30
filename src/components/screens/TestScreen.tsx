// 1. 필요한 라이브러리 및 파일 가져오기
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../../navigation/types';
import { Button, Text } from '@rneui/themed';
import CustomHeader from '../common/CustomHeader';
// 2. 타입 및 인터페이스 정의
interface TestScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamList, 'Test'>;
}

// 3. 화면 컴포넌트 작성
const TestScreen: FC<TestScreenProps> = ({ navigation }) => {
  const onButtonClick1 = () => {
    navigation.navigate('Agreement');
  };

  const onButtonClick11 = () => {
    navigation.navigate('Agreement2', {
      employee: "employee",
      employer: "employer",

      start_year: 1,
      start_month: 1,
      start_day: 1,
      end_year: 1,
      end_month: 1,
      end_day: 1,

      location: "location",
      job: "job",

      start_time: 1,
      end_time: 1,
      start_restTime: 1,
      end_restTime: 1,
  });
  };


  const onButtonClick111 = () => {
    navigation.navigate('Agreement3', {
      employee: "오경택",
      employer: "김준형",

      start_year: 1,
      start_month: 1,
      start_day: 1,
      end_year: 1,
      end_month: 1,
      end_day: 1,

      location: "location",
      job: "job",

      start_time: 1,
      end_time: 1,
      start_restTime: 1,
      end_restTime: 1,

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
    });
  };

  const onButtonClick2 = () => {
    navigation.navigate('AddCareer');
  };

  const onButtonClick3 = () => {
    navigation.navigate('Main');
  };
  const onButtonClick4 = () => {
    navigation.navigate('ShowCareer');
  };

  return (
  <View style={styles.container}>
    
      <Text h3>테스트용 페이지 입니다.{"\n"}</Text>
      <Button
        title="근로계약서 작성"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: '#6CA0DC',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={onButtonClick1}
      />

<Button
        title="근로계약서 작성2"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor:  '#DEA5A4',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={onButtonClick11}
      />

<Button
        title="근로계약서 작성3"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: '#C8E4B2',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={onButtonClick111}
      />

      <Button
        title="이력 작성"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: '9ED2BE',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={onButtonClick2}
      />
      <Button
        title="메인화면"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: '#FFD9B7',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={onButtonClick3}
      />
      <Button
        title="내 이력 조회"
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700' }}
        buttonStyle={{
          backgroundColor: '#82CA9D',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={onButtonClick4}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default TestScreen;
