import Web3 from 'web3';
const contractABI = require('./EmployeeContractABI.json');

const INFURA_API_KEY = '9e60dbf8034f48aa95b9f153bc41d439';
const INFURA_network = 'sepolia';

const privateKey = '0x30237b0a43c0d329842ffbdcb4684be1acd49be8213ba4e5f75b63d869e7da55';
const contractAddress = "0xcE1cf71076Fc8bdc38E2127Dbc4a78eb32E32C62";

const INFURA_url = `wss://${INFURA_network}.infura.io/ws/v3/${INFURA_API_KEY}`;
const webSocketProvider = new Web3.providers.WebsocketProvider(INFURA_url);
const web3 = new Web3(webSocketProvider);

const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const myAddress = account.address;

const contract = new web3.eth.Contract(contractABI, contractAddress);


module.exports = {
    privateKey,
    contractAddress,
    webSocketProvider,
    web3,
    account,
    myAddress,
    contract
  };