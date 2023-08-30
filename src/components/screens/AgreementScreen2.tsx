import React, { useState } from "react";
import { Alert, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigation/types";
import { RouteProp } from '@react-navigation/native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "@react-native-community/checkbox";
import CustomButton from '../common/CustomButton';
import styled from 'styled-components/native';
import CustomHeader from '../common/CustomHeader';


interface AgreementScreen2Props {
  navigation: StackNavigationProp<StackNavigatorParamList, "Agreement2">;
  route: RouteProp<StackNavigatorParamList, 'Agreement2'>;
}

type SalaryType = 1 | 2 | 3;

const AgreementScreen2: React.FC<AgreementScreen2Props> = ({ navigation, route }) => {

  const [work_day, setWorkDay] = useState<number>(0);
  const [holiday, setHoliday] = useState("");

  const [salary, setSalary] = useState<SalaryType>(1);
  const [payment, setPayment] = useState<number>(0);

  const [hasBonus, setHasBonus] = useState(false);
  const [bonus, setBonus] = useState<number>(0);


  const [hasOther, setHasOther] = useState(false);
  const [other_salary, setOtherSalary] = useState("");

  const [payCheck, setPayCheck] = useState<SalaryType>(1);
  const [pay_day, setPayDay] = useState("");

  const [account, setAccount] = useState(false);



  const validateWorkDay = (workDay: number) => {
    if (isNaN(workDay)) {
      return false;
    } else if (workDay < 1 || workDay > 7) {
      return false;
    } else {
      return true;
    }
  }

  const validateHoliDay = (holiday: string) => {
    return true;
  }

  const validateMoney = (payment: number) => {


    if (isNaN(payment)) {
      return false;
    } else if (payment < 0) {
      return false;
    } else {
      return true;
    }
  }

  const validatePayCheck = (payCheck: SalaryType, pay_day: string) => {
    if (payCheck === 1) {
      const day = parseInt(pay_day);
      if (isNaN(day) || day < 0 || day > 31) {
        return false;
      }
    }
    if (payCheck === 2) {
      const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

      if (!weekDays.includes(pay_day)) {
        return false;
      }
    }
    return true;
  }

  const handleSubmit = () => {
    // console.log({
    //   work_day,
    //   holiday,
    //   salary,
    //   payment,
    //   hasBonus,
    //   hasOther,
    //   payCheck,
    //   pay_day,
    //   account
    // });

    if (!validateWorkDay(work_day)) {
      Alert.alert("근무일을 확인해주세요");
      return;
    }

    if (!validateHoliDay(holiday)) {
      Alert.alert("");
      return;
    }

    if (!validateMoney(payment)) {
      Alert.alert("급여를 확인해주세요");
      return;
    }

    if (!validateMoney(bonus)) {
      Alert.alert("상여금을 확인해주세요");
      return;
    }
    if(!validatePayCheck){
      Alert.alert("급여지급일을 확인해주세요");
      return;
    }

    navigation.navigate('Agreement3', {
      employee: route.params.employee,
      employer: route.params.employer,

      start_year: route.params.start_year,
      start_month: route.params.start_month,
      start_day: route.params.start_day,
      end_year: route.params.end_year,
      end_month: route.params.end_month,
      end_day: route.params.end_day,

      location: route.params.location,
      job: route.params.job,

      start_time: route.params.start_time,
      end_time: route.params.end_time,

      start_restTime: route.params.start_restTime,
      end_restTime: route.params.end_restTime,

      work_day: work_day,
      holiday: holiday,

      salary: salary,
      payment: payment,

      hasBonus: hasBonus,
      bonus: bonus,

      hasOther: hasOther,
      other_salary: other_salary,

      payCheck: payCheck,
      pay_day: pay_day,

      account: account
    });

  };


  return (
    <MainContainer>
      <CustomHeader title="표준근로계약서" navigation = {navigation} menu={false}  />
      <Space/>
      <KeyboardAwareScrollView
        style={{ flex: 1, paddingHorizontal: 20, backgroundColor:"#ffffff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <Space />
        <Space />
        <View>
          <BigBoldText>5. 근무일/휴일 :</BigBoldText>
          <Row>
            <CommonText> 매주 </CommonText>
            <NumInput
              onChangeText={text => {
                const number = parseInt(text);
                setWorkDay(isNaN(number) ? 0 : number);
              }}
              maxLength={1}
              keyboardType="numeric"
              placeholder="7"
            />
            <CommonText>일 근무</CommonText>
          </Row>
          <Row>
            <CommonText>주휴일 매주 </CommonText>
            <CommonInput
              onChangeText={setHoliday}
              value={holiday}
              placeholder="월, 화, 수, 목, 금, 토, 일"
            />
            <CommonText>요일</CommonText>

          </Row>
          <Space />
          <Space />
          <BigBoldText>6.급여 :</BigBoldText>
          <Row>
            <CheckBoxContainer>
              {["월급", "일급", "시급"].map((label, index) => (
                <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: index === 2 ? 0 : 20 }}>
                  <CheckBox
                    value={salary === (index + 1) as SalaryType}
                    onValueChange={(newValue) => {
                      if (newValue) {
                        setSalary((index + 1) as SalaryType);
                      }
                    }}
                  />
                  <SmallText>{label}</SmallText>
                </View>
              ))}
            </CheckBoxContainer>
          </Row>
          <Row>
            <SmallInput
              onChangeText={text => {
                const number = parseInt(text);
                setPayment(isNaN(number) ? 0 : number);
              }}
              value={payment.toString()}
              style={{ minWidth: 250 }}
              keyboardType="number-pad"
              maxLength={10}
            />
            <SmallText> 원</SmallText>
          </Row>
          <Row>
            <CheckBoxContainer>
              <SmallText>상여금 : 있음</SmallText>
              <CheckBox
                value={hasBonus}
                onValueChange={newValue => {
                  setHasBonus(newValue);
                  if (!newValue) {
                    setBonus(0);
                  }
                }}
              />
              {hasBonus && (
                <CheckBoxContainer>
                  <SmallInput
                    value={bonus.toString()}
                    onChangeText={text => {
                      const number = parseInt(text);
                      setBonus(isNaN(number) ? 0 : number);
                    }}
                    keyboardType="number-pad"
                    maxLength={10}
                  />
                  <SmallText>원</SmallText>
                </CheckBoxContainer>
              )}
              <SmallText>  없음</SmallText>
              <CheckBox
                value={!hasBonus}
                onValueChange={newValue => {
                  setHasBonus(!newValue)
                  setBonus(0);
                }}
              />
            </CheckBoxContainer>
          </Row>
          <SmallRow>
            <CheckBoxContainer>
              <SmallText>기타급여(제수당 등) : 있음</SmallText>
              <CheckBox
                value={hasOther}
                onValueChange={newValue => {
                  setHasOther(newValue);
                  if (!newValue) {
                    setOtherSalary("");
                  }
                }}
              />
              <SmallText>없음</SmallText>
              <CheckBox
                value={!hasOther}
                onValueChange={newValue => {

                  setHasOther(!newValue)
                  setOtherSalary("");
                }}
              />
            </CheckBoxContainer>
          </SmallRow>

          <SmallRow>
            {hasOther && (
              <SmallInput
                style={{ minWidth: 200 }}
                value={other_salary}
                onChangeText={text => setOtherSalary(text)}
              />
            )}
          </SmallRow>
          <SmallText>임금지급일:</SmallText>
          <CheckBoxContainer>
            {["매월", "매주", "매일"].map((label, index) => (
              <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: index === 2 ? 0 : 20 }}>
                <CheckBox
                  value={payCheck === (index + 1) as SalaryType}
                  onValueChange={(newValue) => {
                    if (newValue) {
                      setPayCheck((index + 1) as SalaryType);
                      setPayDay('');
                    }
                  }}
                />
                <SmallText>{label}</SmallText>
                {(label === "매월" || label === "매주") && payCheck === (index + 1) as SalaryType && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SmallText>   </SmallText>
                    <SmallInput
                      onChangeText={text => setPayDay(text)}
                      value={pay_day}
                    />
                    <SmallText>{label === "매주" ? "요일" : "일"}</SmallText>
                  </View>
                )}
              </View>

            ))}
          </CheckBoxContainer>


          <CheckBoxContainer>
            <SmallText>근로자에게 직접지급</SmallText>
            <CheckBox
              value={!account}
              onValueChange={newValue => {
                setAccount(!newValue);
              }}
            />
            <SmallText>근로자 명의 예금 통장에 입금</SmallText>
            <CheckBox
              value={account}
              onValueChange={newValue => setAccount(newValue)}
            />
          </CheckBoxContainer>
          <Space />
          <Space />
          <BigBoldText>7. 연차유급휴가 :</BigBoldText>
          <Space />
          <SmallText>연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.</SmallText>
          <Space />
          <SmallText>- 1년간 총 소정근로일의 80%이상 출근자에게 15일부여</SmallText>
          <Space />
          <SmallText>- 1년 초과 매 2년마다 1일씩 가산, 한도 25일</SmallText>

          <ButtonContainer>
            <CustomButton
              title="다음"
              onPress={() => handleSubmit()}
              type="next"
            />
          </ButtonContainer>

        </View>
      </KeyboardAwareScrollView>
    </MainContainer >
  );
};




export default AgreementScreen2;



const MainContainer = styled.View`
    flex: 1;
    background-color:#ffffff;
`;

const Space = styled.View`
    margin-vertical: 6px;
`

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
const SmallRow = styled.View`
    flex-direction: row;
    align-items: center;
    margin-vertical: 3px;
    flex : 1;

`;

const CommonText = styled.Text`
    font-size: 18px;
    text-align:left;
`;

const SmallText = styled.Text`
    font-size : 16px;
    text-align:left;
`;


const CommonInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 18px;
    margin-right: 5px;
    text-align: right;
    padding-bottom: 3px;
    padding-top : 3px;
    min-width: 80px;
`;

const NumInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 18px;
    margin-right: 5px;
    text-align: right;
    padding-bottom: 3px;
    padding-top : 3px;
`;


const SmallInput = styled.TextInput`
    border-bottom-width: 1px;
    border-bottom-color: black;
    font-size: 16px;
    margin-right: 5px;
    text-align: center;
    padding-bottom: 0px;
    padding-top : 3px;

`;

const CheckBoxContainer = styled.View`
    flex-direction: row;
    align-items: center;

`;

const BigBoldText = styled.Text`
    font-size: 20px;
    text-align:left;
    font-weight: bold;
`;