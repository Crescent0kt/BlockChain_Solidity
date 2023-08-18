import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import EmployeeCareer from './EmployeeCareer';
const user = new EmployeeCareer();

const App: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleClick1 = async () => {

  };

  const handleClick2 = async () => {

  };

  const handleClick3 = async () => {
  };


  const handleClick4 = async () => {
    // @ts-ignore

  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{message}</Text>
      <View style={{marginTop: 30, marginBottom: 30}}>
        <Button title="버튼 1을 눌러주세요" onPress={handleClick1} />
      </View>
      <View style={{marginBottom: 30}}>
        <Button title="버튼 2을 눌러주세요" onPress={handleClick2} />
      </View>
      <View style={{marginBottom: 30}}>
        <Button title="버튼 3을 눌러주세요" onPress={handleClick3} />
      </View>
      <View>
        <Button title="버튼 4을 눌러주세요" onPress={handleClick4} />
      </View>
    </View>
  );
};

export default App;
