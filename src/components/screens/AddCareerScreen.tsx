import React, { useState } from 'react';
import { StyleSheet,View,TextInput,Alert} from 'react-native';
import { parse, isWithinInterval,isPast } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../../navigation/types';

import { Button, Text } from '@rneui/themed';
import styled from 'styled-components/native';

interface AddCareerScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamList, 'AddCareer'>;
}

const AddCareerScreen: React.FC<AddCareerScreenProps> = ({ navigation }) => {
  const [place, setPlace] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');



  const handleSubmit = () => {
    // 입력 값을 int 형으로 변환하고 문자열로 변환
    const startYearInt = parseInt(startYear, 10);
    const startMonthInt = parseInt(startMonth, 10);
    const startDayInt = parseInt(startDay, 10);
    const endYearInt = parseInt(endYear, 10);
    const endMonthInt = parseInt(endMonth, 10);
    const endDayInt = parseInt(endDay, 10);

    const startDateStr = startYearInt + '-' + startMonthInt + '-' + startDayInt;
    const endDateStr = endYearInt + '-' + endMonthInt + '-' + endDayInt;

    try {
      
      if (!place || !validateAddCareerSelf(startDateStr, endDateStr)) {
        Alert.alert('오류', '올바른 날짜 형식을 입력해주세요.');
      } else {
        //TODO :: 이자리에 AddCareerSelf들어갈예정

        Alert.alert('성공', '성공적으로 추가되었습니다.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('Main'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('오류', '올바른 날짜 형식을 입력해주세요.');
    }
  };

  const validateAddCareerSelf = (startDateStr: string, endDateStr: string) => {
    const startDateParsed = parse(startDateStr, 'yyyy-MM-dd', new Date());
    const endDateParsed = parse(endDateStr, 'yyyy-MM-dd', new Date());

    const minDate = new Date(1970, 0, 1);

    if (!isWithinInterval(startDateParsed, { start: minDate, end: new Date() })) {
      Alert.alert('오류', '시작일자는 1970년부터 현재까지 가능합니다.');
      return false;
    }

    if (!isPast(endDateParsed)) {
      Alert.alert('오류', '종료 일자는 오늘보다 미래에 있을 수 없습니다.');
      return false;
    }

    if (!(startDateParsed < endDateParsed)) {
      Alert.alert('오류', '시작일자는 종료일자보다 이후가 될 수 없습니다.');
      return false;
    }

    return true;
  };


  return (
    <MainContainer>
      <Text h1 style={{ textAlign: "center" }}>이력 추가</Text>
      <Text></Text>
      <Text>장소:</Text>
      <TextInput
        style={styles.input}
        value={place}
        onChangeText={setPlace}
        placeholder="장소를 입력하세요"
      />
      <Text>시작 일자:</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, styles.yearInput]}
          value={startYear}
          onChangeText={setStartYear}
          placeholder="년"
          keyboardType="number-pad"
          maxLength={4}
        />
        <TextInput
          style={[styles.input, styles.monthInput]}
          value={startMonth}
          onChangeText={setStartMonth}
          placeholder="월"
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dayInput]}
          value={startDay}
          onChangeText={setStartDay}
          placeholder="일"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>
      <Text>종료 일자:</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, styles.yearInput]}
          value={endYear}
          onChangeText={setEndYear}
          placeholder="년"
          keyboardType="number-pad"
          maxLength={4}
        />
        <TextInput
          style={[styles.input, styles.monthInput]}
          value={endMonth}
          onChangeText={setEndMonth}
          placeholder="월"
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dayInput]}
          value={endDay}
          onChangeText={setEndDay}
          placeholder="일"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>
      <Button title="확인"
        buttonStyle={{
          backgroundColor: 'rgba(111, 202, 186, 1)',
        }}

        onPress={handleSubmit} />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yearInput: {
    flex: 3,
    marginRight: 5,
  },
  monthInput: {
    flex: 2,
    marginRight: 5,
  },
  dayInput: {
    flex: 2,
  },
});

export default AddCareerScreen;

const MainContainer = styled.View`
  flex:1;
  padding : 16px;
  background-color:#ffffff;
  `
