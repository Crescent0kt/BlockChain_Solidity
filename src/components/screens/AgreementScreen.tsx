import React, { useState } from 'react';
import {
    View,Alert,
} from 'react-native';

import { parse, isWithinInterval,isPast } from 'date-fns';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackNavigatorParamList } from '../../navigation/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CustomButton from '../common/CustomButton';
import styled from 'styled-components/native';


const isValidDate = (startDateStr: string, endDateStr: string) => {
    const startDateParsed = parse(startDateStr, 'yyyy-MM-dd', new Date());
    const endDateParsed = parse(endDateStr, 'yyyy-MM-dd', new Date());

    const minDate = new Date(1970, 0, 1);

    if (!isWithinInterval(startDateParsed, { start: minDate, end: new Date() })) {
        Alert.alert('오류', '시작일자는 1970년부터 현재까지 가능합니다.');
        return false;
    }

    if (!(startDateParsed < endDateParsed)) {
        Alert.alert('오류', '시작일자는 종료일자보다 이후가 될 수 없습니다.');
        return false;
    }

    return true;
};

const isValidTimeValue = (timeValue: number) => {
    return timeValue >= 0 && timeValue <= 24 * 60;
};

const isValidTime = (startTime: number, endTime: number, startRestTime: number, endRestTime: number) => {
    if (isNaN(startTime) || isNaN(endTime) || isNaN(startRestTime) || isNaN(endRestTime)) {
        Alert.alert('오류', '올바른 형식의 시간 값을 입력해주세요.');
        return false;
    }

    if (startTime >= endTime) {
        Alert.alert('오류', '근로 시작 시간은 종료 시간보다 이전이어야 합니다.');
        return false;
    }

    if (startRestTime >= endRestTime) {
        Alert.alert('오류', '휴게 시작 시간은 휴게 종료 시간보다 이전이어야 합니다.');
        return false;
    }
    if (!isValidTimeValue(startTime) || !isValidTimeValue(endTime) || !isValidTimeValue(startRestTime) || !isValidTimeValue(endRestTime)) {
        Alert.alert('오류', '0부터 24시간(분 단위) 사이의 값을 입력해주세요.');
        return false;
    }
    return true;
};



interface AgreementScreenProps {
    navigation: StackNavigationProp<StackNavigatorParamList, 'Agreement'>;
}

const AgreementScreen: React.FC<AgreementScreenProps> = ({ navigation }) => {
    const [employer, setEmployer] = useState('');
    const [employee, setEmployee] = useState('');
    const [start_year, setStartYear] = useState('');
    const [start_month, setStartMonth] = useState('');
    const [start_day, setStartDay] = useState('');
    const [end_year, setEndYear] = useState('');
    const [end_month, setEndMonth] = useState('');
    const [end_day, setEndDay] = useState('');
    const [location, setLocation] = useState('');
    const [job, setJob] = useState('');


    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [startRestHour, setStartRestHour] = useState('');
    const [startRestMinute, setStartRestMinute] = useState('');
    const [endRestHour, setEndRestHour] = useState('');
    const [endRestMinute, setEndRestMinute] = useState('');


    const handleSubmit = () => {
        // 입력 값을 int 형으로 변환하고 문자열로 변환
        const startYear = parseInt(start_year, 10);
        const startMonth = parseInt(start_month, 10);
        const startDay = parseInt(start_day, 10);
        const endYear = parseInt(end_year, 10);
        const endMonth = parseInt(end_month, 10);
        const endDay = parseInt(end_day, 10);

        const startDateStr = startYear + '-' + startMonth + '-' + startDay;
        const endDateStr = endYear + '-' + endMonth + '-' + endDay;

        const start_time = parseInt(startHour) * 60 + parseInt(startMinute);
        const end_time = parseInt(endHour) * 60 + parseInt(endMinute);
        const start_restTime = parseInt(startRestHour) * 60 + parseInt(startRestMinute);
        const end_restTime = parseInt(endRestHour) * 60 + parseInt(endRestMinute);

        try {
            if (
                !employee ||
                !employer ||
                !location ||
                !job ||
                !isValidDate(startDateStr, endDateStr) ||
                !isValidTime(start_time, end_time, start_restTime, end_restTime)
            ) {
                Alert.alert('오류', '올바른 형식을 입력해주세요.');
            } else {
                navigation.navigate('Agreement2', {
                    employee: employee,
                    employer: employer,

                    start_year: startYear,
                    start_month: startMonth,
                    start_day: startDay,
                    end_year: endYear,
                    end_month: endMonth,
                    end_day: endDay,

                    location: location,
                    job: job,

                    start_time: start_time,
                    end_time: end_time,
                    start_restTime: start_restTime,
                    end_restTime: end_restTime,
                });
            }
        } catch (error) {
            Alert.alert('오류', '올바른 형식을 입력해주세요.');
        }
    };


    return (
        <MainContainer>
            <KeyboardAwareScrollView
               style={{flex:1,paddingHorizontal:20}}
                contentContainerStyle={{ flexGrow: 1 }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
            >
                <TitleContainer>
                    <Title>표준근로계약서</Title>
                </TitleContainer>
                <Separator />

                <View>
                    <Row>
                        <CommonInput
                            onChangeText={setEmployer}
                            value={employer}
                            placeholder="사업주"
                        />
                        <CommonText>(이하 “사업주”라 함)과(와)</CommonText>
                    </Row>
                    <Row>
                        <CommonInput
                            onChangeText={setEmployee}
                            value={employee}
                            placeholder="근로자"
                        />
                        <CommonText>(이하 “근로자”라 함)은</CommonText>
                    </Row>
                    <Row>
                        <CommonText>
                            다음과 같이 근로계약을 체결한다.
                        </CommonText>
                    </Row>
                    <Space />
                    <BoldText>1. 근로계약기간:</BoldText>
                    <Row>
                        <FourNumInput
                            onChangeText={setStartYear}
                            value={start_year}
                            keyboardType="number-pad"
                            placeholder="1999"
                        />
                        <CommonText>년 </CommonText>
                        <TwoNumInput
                            onChangeText={setStartMonth}
                            value={start_month}
                            keyboardType="number-pad"
                            placeholder="01"

                        />
                        <CommonText>월 </CommonText>
                        <TwoNumInput
                            onChangeText={setStartDay}
                            value={start_day}
                            keyboardType="number-pad"
                            placeholder="01"
                        />
                        <CommonText>일 부터</CommonText>
                    </Row>
                    <Row>
                        <FourNumInput
                            onChangeText={setEndYear}
                            value={end_year}
                            keyboardType="number-pad"
                            placeholder="1999"
                        />
                        <CommonText>년 </CommonText>
                        <TwoNumInput
                            onChangeText={setEndMonth}
                            value={end_month}

                            keyboardType="number-pad"
                            placeholder="12"
                        />
                        <CommonText>월 </CommonText>
                        <TwoNumInput
                            onChangeText={setEndDay}
                            value={end_day}
                            keyboardType="number-pad"
                            placeholder="31"
                        />
                        <CommonText>일 까지</CommonText>
                    </Row>
                    <SmallText>
                        ※ 근로계약기간을 정하지 않는 경우에는 '근로개시일'만 기재
                    </SmallText>
                    <Row>
                        <Space />
                        <BoldText>2. 근무장소 :  </BoldText>
                        <WideInput
                            onChangeText={setLocation}
                            value={location}
                            placeholder="근무장소"
                        />
                    </Row>
                    <Row>
                        <Space />
                        <BoldText>3. 업무내용 :  </BoldText>
                        <WideInput
                            onChangeText={setJob}
                            value={job}
                            placeholder="업무내용"
                        />
                    </Row>
                    <Space />
                    <BoldText>4. 소정근로시간 :</BoldText>
                    <Row>
                        <TwoNumInput

                            onChangeText={setStartHour}
                            value={startHour}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='00'
                        />
                        <CommonText>시 </CommonText>
                        <TwoNumInput

                            onChangeText={setStartMinute}
                            value={startMinute}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='00'
                        />
                        <CommonText>분부터  </CommonText>
                        <TwoNumInput

                            onChangeText={setEndHour}
                            value={endHour}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='23'
                        />
                        <CommonText>시 </CommonText>
                        <TwoNumInput

                            onChangeText={setEndMinute}
                            value={endMinute}
                            keyboardType="number-pad"
                            placeholder='59'
                            maxLength={2}
                        />
                        <CommonText>분까지</CommonText>
                    </Row>
                    <Row>
                        <SmallText>(휴게시간 :</SmallText>
                        <SmallInput

                            onChangeText={setStartRestHour}
                            value={startRestHour}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='00'
                        />
                        <SmallText>시</SmallText>
                        <SmallInput

                            onChangeText={setStartRestMinute}
                            value={startRestMinute}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='00'
                        />
                        <SmallText>분 ~</SmallText>
                        <SmallInput

                            onChangeText={setEndRestHour}
                            value={endRestHour}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='23'
                        />
                        <SmallText>시</SmallText>
                        <SmallInput
                            onChangeText={setEndRestMinute}
                            value={endRestMinute}
                            keyboardType="number-pad"
                            maxLength={2}
                            placeholder='59'
                        />
                        <SmallText>분)</SmallText>
                    </Row>
                    <ButtonContainer>
                        <CustomButton
                            title="다음"
                            onPress={() => handleSubmit()}
                            type="next"
                        />
                    </ButtonContainer>
                </View>
            </KeyboardAwareScrollView>
        </MainContainer>
    );
};



export default AgreementScreen;

const MainContainer = styled.View`
    flex: 1
`;

const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin : 20px;
    
`;

const Space = styled.View`
    margin-vertical: 6px;
`


const Title = styled.Text`
    flex:1;
    font-size: 30px;
    textAlign: center;
    font-weight: bold;
`

const Separator = styled.View`
    borderBottomWidth: 2px;
    borderBottomColor: black;
    margin-bottom:5px;
`;

const ButtonContainer = styled.View`
  justify-content:center;
  margin-top:30px;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-vertical: 6px;
    flex : 1;

`;

const CommonText = styled.Text`
    font-size: 18px;
    text-align:left;
`;

const BoldText = styled.Text`
    font-size: 18px;
    text-align:left;
    font-weight: bold;
`;

const SmallText = styled.Text`
    font-size : 14px;
    text-align:left;
`;


const CommonInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 18px;
    margin-right: 5px;
    text-align: center;
    padding-bottom: 3px;
    padding-top : 3px;
    min-width: 80px;
`;

const FourNumInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 18px;
    margin-right: 5px;
    text-align: center;
    padding-bottom: 3px;
    padding-top : 3px;
`;

const TwoNumInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 18px;
    margin-right: 5px;
    text-align: center;
    padding-bottom: 3px;
    padding-top : 3px;
`;

const SmallInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 14px;
    margin-right: 5px;
    text-align: center;
    padding-bottom: 0px;
    padding-top : 3px;

`;

const WideInput = styled.TextInput`

    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 18px;
    margin-right: 5px;
    text-align: center;
    padding-bottom: 3px;
    padding-top : 3px;
    min-width: 200px;
`;