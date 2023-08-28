import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackNavigatorParamList } from "../../navigation/types";
import { RouteProp } from '@react-navigation/native';

import CheckBox from "@react-native-community/checkbox";
import styles from '../stylesheet/AgreementStyleSheet';



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

  const startHour =  Math.floor(start_time / 60);
  const startMinute = start_time % 60;

  const end_time = route.params.end_time;

  const endHour =  Math.floor(end_time / 60);
  const endMinute = end_time % 60;

  const start_restTime = route.params.start_restTime;

  const startRestHour = Math.floor(start_restTime / 60);
  const startRestMinute = start_restTime % 60;

  const end_restTime = route.params.end_restTime;

  const endRestHour =  Math.floor(end_restTime / 60);
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
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={{ ...styles.title, textAlign: "center" }}>표준근로계약서</Text>

      </View>

      <View style={styles.separator} />
      <ScrollView style={{ paddingLeft: 20, paddingRight: 20,paddingBottom:10}}>
        <View style={styles.row}>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{employer}</Text>
          <Text style={styles.text}>(이하 “사업주”라 함)과(와)</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{employee}</Text>
          <Text style={styles.text}>(이하 “근로자”라 함)은</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            다음과 같이 근로계약을 체결한다.
          </Text>
        </View>
        <Text style={styles.text}>{"\n"}1. 근로계약기간:</Text>
        <View style={styles.row}>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{start_year}</Text>
          <Text style={styles.text}> 년 </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{start_month}</Text>
          <Text style={styles.text}> 월 </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{start_day}</Text>
          <Text style={styles.text}> 일 부터</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{end_year}</Text>
          <Text style={styles.text}> 년 </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{end_month}</Text>
          <Text style={styles.text}> 월 </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{end_day}</Text>
          <Text style={styles.text}> 일 까지</Text>
        </View>
        <Text style={[styles.text, { fontSize: 14 }]}>
          ※ 근로계약기간을 정하지 않는 경우에는 '근로개시일'만 기재
        </Text>
        <View style={styles.row}></View>
        <View style={styles.row}>

          <Text style={styles.text}>2. 근무장소 :  </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{location}</Text>
        </View>
        <View style={styles.row}></View>
        <View style={styles.row}>
          <Text style={styles.text}>3. 업무내용 :  </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{job}</Text>
        </View>

        <Text style={styles.text}>{"\n"}4. 소정근로시간 :</Text>
        <View style={styles.row}>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{startHour}</Text>
          <Text> 시</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{startMinute}</Text>
          <Text> 분부터    </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{endHour}</Text>
          <Text> 시</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}>{endMinute}</Text>
          <Text> 분까지</Text>
        </View>
        <View style={styles.row}>
          <Text>(휴게시간 :</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {startRestHour} </Text>
          <Text>시</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {startRestMinute} </Text>
          <Text>분 ~</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {endRestHour} </Text>
          <Text>시</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {endRestMinute} </Text>
          <Text>분)</Text>
        </View>
        <View style={styles.row}></View>
        <Text style={styles.text}>5. 근무일/휴일 :</Text>
        <View style={styles.row}>
          <Text> 매주 </Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {work_day} </Text>
          <Text>일 근무, 주휴일 매주</Text>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {holiday} </Text>
          <Text>요일</Text>

        </View>
        <View style={styles.row}></View>
        <Text style={styles.text}>6.급여 :</Text>
        <View style={{ flexDirection: 'row' }}>
          {["월급", "일급", "시급"].map((label, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: index === 2 ? 0 : 20 }}>
              <CheckBox
                value={salary === (index + 1)}
                disabled={true}
                tintColors={{ true: 'green' }}
              />
              <Text>{label}</Text>
            </View>

          ))}
        </View>
        <View style={styles.row}>
          <Text style={{ ...styles.text, fontWeight: "bold" }}> {payment} </Text>
          <Text style={styles.smallText}> 원</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>상여금: 있음</Text>
          <CheckBox
            value={hasBonus}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
          {hasBonus && (
            <Text style={{ ...styles.text, fontWeight: "bold" }}> {bonus} </Text>
          )}
          <Text>없음</Text>
          <CheckBox
            value={!hasBonus}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>기타급여(제수당 등): 있음</Text>
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
        </View>

          {hasOther && (
            <View style={styles.row}>
            <Text style={{ ...styles.text, fontWeight: "bold" }}> {other_salary} </Text>
            <Text style={styles.smallText}> 원</Text>
            </View>
          )}

        <Text>임금지급일:</Text>
        <View style={{ flexDirection: 'row' }}>
          {["매월", "매주", "매일"].map((label, index) => (
            <View key={index} style={{ flexDirection: "row", alignItems: "center", marginRight: index === 2 ? 0 : 20 }}>
              <CheckBox
                value={payCheck === (index + 1)}
                disabled={true}
                tintColors={{ true: 'green' }}
              />
              <Text>{label}</Text>
              {(label === "매월" || label === "매주") && payCheck === (index + 1) && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ ...styles.text, fontWeight: "bold" }}> {pay_day} </Text>
                  <Text>{label === "매주" ? "요일" : "일"}</Text>
                </View>
              )}
            </View>

          ))}
        </View>


        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>근로자에게 직접지급</Text>
          <CheckBox
            value={!account}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
          <Text>근로자 명의 예금 통장에 입금</Text>
          <CheckBox
            value={account}
            disabled={true}
            tintColors={{ true: 'green' }}
          />
        </View>
        <View style={styles.row}></View>

        <Text style={styles.text}>7. 연차유급휴가 :</Text>
        <Text style={{ ...styles.text, fontSize: 14 }}>{"\n"}연차유급휴가는 근로기준법에서 정하는 바에 따라 부여함.</Text>
        <Text style={styles.smallText}>{"\n"}- 1년간 총 소정근로일의 80%이상 출근자에게 15일부여{"\n"}{"\n"}- 1년 초과 매 2년마다 1일씩 가산, 한도 25일</Text>
        <View style={styles.row}></View>       
        <Text style={styles.text}>8. 사회보험 적용여부 :</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox value={insurance1}  disabled={true}
                tintColors={{ true: 'green' }} />
          <Text>고용보험</Text>

          <CheckBox value={insurance2}  disabled={true}
                tintColors={{ true: 'green' }} />
          <Text>산재보험</Text>

          <CheckBox value={insurance3}  disabled={true}
                tintColors={{ true: 'green' }} />
          <Text>국민연금</Text>

          <CheckBox value={insurance4}  disabled={true}
                tintColors={{ true: 'green' }} />
          <Text>건강보험</Text>
        </View>

        <Text style={styles.text}>{"\n"}9. 근로계약서 교부</Text>
        <Text style={{ ...styles.text, fontSize: 14 }}>사업주는 근로계약을 체결함과 동시에 본 계약서를 사본하여{"\n"}
          근로자의 교부요구와 관계없이 근로자에게 교부함{"\n"}
          (근로기준법 제17조 이행)</Text>

        <Text style={styles.text}>{"\n"}10. 근로계약, 취업규칙 등의 성실한 이행의무</Text>
        <Text style={{ ...styles.text, fontSize: 14 }}>사업주와 근로자는 각자가 근로계약, 취업규칙,
          {"\n"}단체협약을 지키고 성실하게 이행하여야 함</Text>

        <Text style={styles.text}>{"\n"}11. 기타</Text>
        <Text style={{ ...styles.text, fontSize: 14 }}>  - 이 계약에 정함이 없는 사항은 근로기준법령에 의함</Text>
        <Text style={{ fontSize:20,textAlign: 'right', marginTop: 30,marginBottom:30 }}>{create_time}</Text>

      </ScrollView>
    </View>

  );



};



export default ShowAgreementScreen;
