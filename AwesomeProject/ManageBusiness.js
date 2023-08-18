const Web3 = require('web3');

class ManageBusiness {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    this.contractAbi = [
  
    ]; // ABI 배열

    this.contractAddress = ''; // 스마트 컨트랙트 주소

    this.contract = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
  }

  async addBusinessList(latitude, longitude, name) {
    const accounts = await this.web3.eth.getAccounts();

    try {
      await this.contract.methods.addBusinessList({ latitude, longitude, name }).send({ from: accounts[0] });
      console.log('Business added:', latitude, longitude, name);
    } catch (error) {
      console.error('Error adding business:', error);
    }
  }

  async addEmployee(businessId, employeeAddress) {
    const accounts = await this.web3.eth.getAccounts();

    try {
      await this.contract.methods.addEmployee(businessId, employeeAddress).send({ from: accounts[0] });
      console.log('Employee added:', businessId, employeeAddress);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }

  async linkEmployeeContract(employeeAddress, contractId) {
    const accounts = await this.web3.eth.getAccounts();

    try {
      await this.contract.methods.linkEmployeeContract(employeeAddress, contractId).send({ from: accounts[0] });
      console.log('Employee contract linked:', employeeAddress, contractId);
    } catch (error) {
      console.error('Error linking employee contract:', error);
    }
  }
}

module.exports = ManageBusiness;