import Web3 from 'web3';
import * as FileSystem from 'expo-file-system';

class ManageAttendance {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

    this.contractAbi = [
    
    ]; // ABI 배열

    this.contractAddress = ''; // 스마트 컨트랙트 주소

    this.contract = new this.web3.eth.Contract(
      this.contractAbi,
      this.contractAddress
    );
  }

  async saveLogsToBlockchain(logs) {
    const accounts = await this.web3.eth.getAccounts();
    const logString = JSON.stringify(logs);

    try {
      await this.contract.methods.saveLogs(logString).send({ from: accounts[0] });
      console.log('Logs saved to the blockchain:', logString);
    } catch (error) {
      console.error('Error saving logs to the blockchain:', error);
    }
  }

  async saveLogsToFile(logs) {
    const logString = JSON.stringify(logs);

    try {
      const fileName = 'attendance_logs.txt';
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, logString, { encoding: FileSystem.EncodingType.UTF8 });
      console.log('Logs saved to file:', fileUri);
    } catch (error) {
      console.error('Error saving logs to file:', error);
    }
  }

  async registerWorkLocation(latitude, longitude) {
    const accounts = await this.web3.eth.getAccounts();

    try {
      await this.contract.methods.registerWorkLocation(latitude, longitude).send({ from: accounts[0] });
      console.log('Work location registered:', latitude, longitude);
    } catch (error) {
      console.error('Error registering work location:', error);
    }
  }
}

export default ManageAttendance;