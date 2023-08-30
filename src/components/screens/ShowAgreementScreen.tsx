import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigation/types";
import { RouteProp } from '@react-navigation/native';

import CheckBox from "@react-native-community/checkbox";
import styled from 'styled-components/native';
import CustomHeader from "../common/CustomHeader";



interface ShowAgreementScreenProps {
  navigation: StackNavigationProp<StackNavigatorParamList, "ShowAgreement">;
  route: RouteProp<StackNavigatorParamList, 'ShowAgreement'>;
}


const ShowAgreementScreen: React.FC<ShowAgreementScreenProps> = ({ navigation, route }) => {

  const employer = route.params.employer;
  const employee = route.params.employee;

  const start_year = route.params.start_year;
  const start_month = route.params.start_month;
  const start_day = route.params.start_day;

  const end_year = route.params.end_year;
  const end_month = route.params.end_month;
  const end_day = route.params.end_day;

  const location = route.params.location;
  const job = route.params.job;

  const start_time = route.params.start_time;

  const startHour = Math.floor(start_time / 60);
  const startMinute = start_time % 60;

  const end_time = route.params.end_time;

  const endHour = Math.floor(end_time / 60);
  const endMinute = end_time % 60;

  const start_restTime = route.params.start_restTime;

  const startRestHour = Math.floor(start_restTime / 60);
  const startRestMinute = start_restTime % 60;

  const end_restTime = route.params.end_restTime;

  const endRestHour = Math.floor(end_restTime / 60);
  const endRestMinute = end_restTime % 60;


  const work_day = route.params.work_day;
  const holiday = route.params.holiday;

  const salary = route.params.salary;
  const payment = route.params.payment;

  const hasBonus = route.params.hasBonus;
  const bonus = route.params.bonus;

  const hasOther = route.params.hasOther;
  const other_salary = route.params.other_salary;

  const payCheck = route.params.payCheck;
  const pay_day = route.params.pay_day;

  const account = route.params.account;

  const insurance1 = route.params.insurance1;
  const insurance2 = route.params.insurance2;
  const insurance3 = route.params.insurance3;
  const insurance4 = route.params.insurance4;

  const create_time = route.params.create_time;

  return (
    <MainContainer>
      <CustomHeader title="근로계약서 조회" navigation={navigation} menu={false} />

      <ScrollContainer>
        <Row>
          <BigBoldText>{employer}</BigBoldText>
          <CommonText>(이하 “사업주”라 함)과(와)</CommonText>
        </Row>
        <Row>
          <BigBoldText>{employee}</BigBoldText>
          <CommonText>(이하 “근로자”라 함)은(는)</CommonText>
        </Row>
        <Row>
          <CommonText>
            다음과 같이 근로계약을 체결한다.
          </CommonText>
        </Row>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <BigBoldText>1. 근로계약기간:</BigBoldText>
        <Row>
          <BoldText>{start_year}</BoldText>
          <CommonText>년 </CommonText>
          <BoldText>{start_month}</BoldText>
          <CommonText>월 </CommonText>
          <BoldText>{start_day}</BoldText>
          <CommonText>일 부터   </CommonText>
          <BoldText>{end_year}</BoldText>
          <CommonText>년 </CommonText>
          <BoldText>{end_month}</BoldText>
          <CommonText>월 </CommonText>
          <BoldText>{end_day}</BoldText>
          <CommonText>일 까지</CommonText>
        </Row>
        <SmallText>
          ※ 근로계약기간을 정하지 않는 경우에는 '근로개시일'만 기재
        </SmallText>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <Row>
          <BigBoldText>2. 근무장소 :  </BigBoldText>
          <BoldText>{location}</BoldText>
        </Row>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <Row>
          <BigBoldText>3. 업무내용 :  </BigBoldText>
          <BoldText>{job}</BoldText>
        </Row>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <BigBoldText>4. 소정근로시간 :</BigBoldText>
        <Row>
          <BoldText>{startHour}</BoldText>
          <CommonText>시 </CommonText>
          <BoldText>{startMinute}</BoldText>
          <CommonText>분부터  </CommonText>
          <BoldText>{endHour}</BoldText>
          <CommonText>시 </CommonText>
          <BoldText>{endMinute}</BoldText>
          <CommonText>분까지</CommonText>
        </Row>
        <Row>
          <CommonText>(휴게시간 :</CommonText>
          <BoldText> {startRestHour}</BoldText>
          <CommonText>시 </CommonText>
          <BoldText> {startRestMinute}</BoldText>
          <CommonText>분 ~ </CommonText>
          <BoldText> {endRestHour}</BoldText>
          <CommonText>시 </CommonText>
          <BoldText> {endRestMinute}</BoldText>
          <CommonText>분)</CommonText>
        </Row>

        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <BigBoldText>5. 근무일/휴일 :</BigBoldText>
        <Row>
          <CommonText> 매주 </CommonText>
          <BoldText> {work_day} </BoldText>
          <CommonText>일 근무, 주휴일 매주</CommonText>
          <BoldText> {holiday} </BoldText>
          <CommonText>요일</CommonText>

        </Row>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />

        <BigBoldText>6.급여 :</BigBoldText>
        <CheckBoxContainer>
          {["월급", "일급", "시급"].map((label, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: index === 2 ? 0 : 20 }}>
              <CheckBox
                value={salary === (index + 1)}
                disabled={true}
                tintColors={{ true: 'green' }}
              />
              <CommonText>{label}</CommonText>
              {salary === (index + 1) && (
                <>
                  <BoldText> {payment} </BoldText>
                  <CommonText>원</CommonText>
                </>
              )}
            </View>
          ))}
        </CheckBoxContainer>

        <Row>
          <>
            <CommonText>상여금:</CommonText>
            <CommonText> 있음</CommonText>
          </>
          <CheckBox
            value={hasBonus}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
          {hasBonus && (
            <BoldText> {bonus}원 </BoldText>
          )}
          <CommonText> 없음</CommonText>
          <CheckBox
            value={!hasBonus}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
        </Row>


        <CheckBoxContainer>
          <>
            <CommonText>기타급여(제수당 등):</CommonText>
            <CommonText>있음</CommonText>
          </>
          <CheckBox
            value={hasOther}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
          <Text>없음</Text>
          <CheckBox
            value={!hasOther}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
        </CheckBoxContainer>

        {hasOther && (
          <Row>
            <BoldText>  - {other_salary}</BoldText>
            <CommonText>원</CommonText>
          </Row>
        )}

        <CommonText>임금지급일:</CommonText>
        <CheckBoxContainer>
          {["매월", "매주", "매일"].map((label, index) => (

            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: index === 2 ? 0 : 20 }}>
              <CheckBox
                value={payCheck === (index + 1)}
                disabled={true}
                tintColors={{ true: 'green' }}
              />

              <CommonText>{label}</CommonText>

              {(label === "매월" || label === "매주") && payCheck === (index + 1) && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <BoldText> {pay_day} </BoldText>
                  <CommonText>{label === "매주" ? "요일" : "일"}</CommonText>
                </View>
              )}
            </View>

          ))}
        </CheckBoxContainer>


        <CheckBoxContainer>
          <SmallText>근로자에게 직접지급</SmallText>
          <CheckBox
            value={!account}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
          <SmallText>근로자 명의 예금 통장에 입금</SmallText>
          <CheckBox
            value={account}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
        </CheckBoxContainer>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />

        <BigBoldText>7. 연차유급휴가 :</BigBoldText>
        <Space />
        <SmallText>연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.</SmallText>
        <Space />
        <SmallText>- 1년간 총 소정근로일의 80%이상 출근자에게 15일부여</SmallText>
        <Space />
        <SmallText>- 1년 초과 매 2년마다 1일씩 가산, 한도 25일</SmallText>
        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <BigBoldText>8. 사회보험 적용여부 :</BigBoldText>

        <CheckBoxContainer>
          <CheckBox value={insurance1} disabled={true}
            tintColors={{ true: 'green' }} />
          <CommonText>고용보험</CommonText>

          <CheckBox value={insurance2} disabled={true}
            tintColors={{ true: 'green' }} />
          <CommonText>산재보험</CommonText>

          <CheckBox value={insurance3} disabled={true}
            tintColors={{ true: 'green' }} />
          <CommonText>국민연금</CommonText>

          <CheckBox value={insurance4} disabled={true}
            tintColors={{ true: 'green' }} />
          <CommonText>건강보험</CommonText>
        </CheckBoxContainer>

        <Space />
        <Space />
        <Space />
        <Space />
        <Space />


        <BigBoldText>9. 근로계약서 교부</BigBoldText>
        <SmallText>사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여</SmallText>
        <Space />
        <SmallText>근로자의 교부요구와 관계없이 근로자에게 교부함</SmallText>
        <Space />
        <SmallText>(근로기준법 제17조 이행)</SmallText>

        <Space />
        <Space />
        <Space />
        <Space />
        <Space />


        <BoldText>10. 근로계약, 취업규칙 등의 성실한 이행의무</BoldText>
        <SmallText>사업주와 근로자는 각자가 근로계약, 취업규칙,</SmallText>
        <Space />
        <SmallText>단체협약을 지키고 성실하게 이행하여야 함</SmallText>

        <Space />
        <Space />
        <Space />
        <Space />
        <Space />
        <BigBoldText>11. 기타</BigBoldText>
        <SmallText>  - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</SmallText>
        <Text style={{ fontSize: 20, textAlign: 'right', marginTop: 30, marginBottom: 30 }}>{create_time}</Text>

      </ScrollContainer>
    </MainContainer>

  );



};



export default ShowAgreementScreen;

const MainContainer = styled.View`
    flex: 1;
    background-color: #FFFFFF;
`;

const Space = styled.View`
    margin-vertical: 3px;
    background-color: #ffffff;
`


const ScrollContainer = styled.ScrollView`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
    background-color: #ffffff;
`;

const Row = styled.View`
    flex-direction: row;
    align-items: center;
    margin-vertical: 6px;
    flex : 1;
    background-color: #ffffff;

`;

const CommonText = styled.Text`
    font-size: 15px;
    text-align:left;
`;

const BoldText = styled.Text`
    font-size: 30px;
    text-align:left;
    font-weight: bold;
`;

const BigBoldText = styled.Text`
    font-size: 20px;
    text-align:left;
    font-weight: bold;
`;
const SmallText = styled.Text`
    font-size : 13px;
    text-align:left;
`;


const CheckBoxContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;