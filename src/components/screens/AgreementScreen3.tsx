import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigation/types";
import { RouteProp } from '@react-navigation/native';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CheckBox from "@react-native-community/checkbox";
import CustomButton from '../common/CustomButton';
import styled from 'styled-components/native';
import CustomHeader from "../common/CustomHeader";


interface AgreementScreen3Props {
  navigation: StackNavigationProp<StackNavigatorParamList, "Agreement3">;
  route: RouteProp<StackNavigatorParamList, 'Agreement3'>;
}


const AgreementScreen3: React.FC<AgreementScreen3Props> = ({ navigation, route }) => {
  const [insurance1, setInsurance1] = useState(false);
  const [insurance2, setInsurance2] = useState(false);
  const [insurance3, setInsurance3] = useState(false);
  const [insurance4, setInsurance4] = useState(false);

  const today = new Date();
  const create_time = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const handleSubmit = () => {
    console.log("employee:", route.params.employee);
    console.log("employer:", route.params.employer);
    console.log("start_year:", route.params.start_year);
    console.log("start_month:", route.params.start_month);
    console.log("start_day:", route.params.start_day);
    console.log("end_year:", route.params.end_year);
    console.log("end_month:", route.params.end_month);
    console.log("end_day:", route.params.end_day);
    console.log("work_day:", route.params.work_day);

    console.log("location:", route.params.location);
    console.log("job:", route.params.job);
    console.log("start_time:", route.params.start_time);
    console.log("end_time:", route.params.end_time);
    console.log("start_restTime:", route.params.start_restTime);
    console.log("end_restTime:", route.params.end_restTime);

    console.log("holiday:", route.params.holiday);
    console.log("salary:", route.params.salary);
    console.log("payment:", route.params.payment);
    console.log("hasBonus:", route.params.hasBonus);
    console.log("bonus:", route.params.bonus);
    console.log("hasOther:", route.params.hasOther);
    console.log("other_salary:", route.params.other_salary);
    console.log("payCheck:", route.params.payCheck);
    console.log("pay_day:", route.params.pay_day);
    console.log("account:", route.params.account);

    console.log("insurance1:", insurance1);
    console.log("insurance2:", insurance2);
    console.log("insurance3:", insurance3);
    console.log("insurance4:", insurance4);

    console.log("create_time:", create_time);

  };


  return (
    <MainContainer>
      <CustomHeader title="표준근로계약서" navigation={navigation} menu={false} />
      <Space />
      <KeyboardAwareScrollView
        style={{ flex: 1, paddingHorizontal: 20, backgroundColor: "#ffffff" }}
        contentContainerStyle={{ flexGrow: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
      >
        <View>
          <Space />
          <Space />
          <BigBoldText>8. 사회보험 적용여부(해당란에체크) :</BigBoldText>

          <CheckBoxContainer>
            <CheckBox value={insurance1} onValueChange={(newValue) => setInsurance1(newValue)} />
            <SmallText>고용보험</SmallText>

            <CheckBox value={insurance2} onValueChange={(newValue) => setInsurance2(newValue)} />
            <SmallText>산재보험</SmallText>

            <CheckBox value={insurance3} onValueChange={(newValue) => setInsurance3(newValue)} />
            <SmallText>국민연금</SmallText>

            <CheckBox value={insurance4} onValueChange={(newValue) => setInsurance4(newValue)} />
            <SmallText>건강보험</SmallText>
          </CheckBoxContainer>
          <Space />
          <Space />
          <Space />
          <BigBoldText>9. 근로계약서 교부</BigBoldText>
          <SmallText>사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여{"\n"}
            근로자의 교부요구와 관계없이 근로자에게 교부함{"\n"}
            (근로기준법 제17조 이행)</SmallText>

          <Space />
          <Space />
          <Space />
          <BigBoldText>10. 근로계약, 취업규칙 등의 성실한 이행의무</BigBoldText>
          <SmallText>사업주와 근로자는 각자가 근로계약, 취업규칙
            {"\n"}단체협약을 지키고 성실하게 이행하여야 함</SmallText>

          <Space />
          <Space />
          <Space />
          <BigBoldText>11. 기타</BigBoldText>
          <SmallText>  - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</SmallText>

          <Space />
          <Space />

          <Text style={{ fontSize: 20, textAlign: 'right', marginTop: 50, marginBottom: 20 }}>{create_time}</Text>
          <Text style={{ fontSize: 20, textAlign: 'right' }}>대표자 : {route.params.employer}</Text>
          <Text style={{ fontSize: 20, textAlign: 'right', marginBottom: 100 }}>근로자 : {route.params.employee}</Text>
          <ButtonContainer>
            <CustomButton
              title="완료"
              onPress={() => handleSubmit()}
              type="next"
            />
          </ButtonContainer>
        </View>
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};



export default AgreementScreen3;


const MainContainer = styled.View`
    flex: 1;
    background-color : #ffffff
`;

const Space = styled.View`
    margin-vertical: 6px;
`


const ButtonContainer = styled.View`
  justify-content:center;
  margin-top:30px;
`;


const SmallText = styled.Text`
    font-size : 16px;
    text-align:left;
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