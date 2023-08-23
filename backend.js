const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const { Web3 } = require('web3');
const secp256k1 = require('secp256k1');
const ecies = require('eth-ecies');
const crypto = require('crypto');
const bodyParser = require('body-parser');


const app = express();
//CORS정책 적용 (모두에게 허용)
app.use(cors());
app.use(bodyParser.json());

//mysql 접속 설정
const conn = {  
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '0000',
  database: 'testschema'
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
try{
  connection.connect();   // DB 접속
  console.log('MYSQL Connected!');
} catch{
  console.error(error);
}


const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// 암호화 정책 
// 프라이빗 키를 이용하여 EC키 객체를 추출하는 함수
function getECKeyPairFromPrivateKey(privateKey) {
  const {privateToPublic} = require('ethereumjs-util');
  const privateKeyBuffer = Buffer.from(privateKey.replace(/^0x/, ''), 'hex');
  const publicKeyBuffer = privateToPublic(privateKeyBuffer);
  const publicKeyLength = publicKeyBuffer.length;
  
  // 타원곡선 공개키의 최초 4바이트 삭제
  const ecPublicKey = publicKeyBuffer.slice(publicKeyLength === 65 ? 1 : 0).toString('hex');
  return ecPublicKey;
}

// 암호화
function encryptMessage(publicKey, message) {
  const publicKeyBuffer = Buffer.from(publicKey, 'hex');
  const encryptedData = ecies.encrypt(publicKeyBuffer, Buffer.from(message));
  return encryptedData.toString('base64');
}

// 복호화
function decryptMessage(privateKey, encryptedMessage) {
  const privateKeyBuffer = Buffer.from(privateKey.replace(/^0x/, ''), 'hex');
  const decryptedData = ecies.decrypt(privateKeyBuffer, Buffer.from(encryptedMessage, 'base64'));
  return decryptedData.toString();
}

//프라이빗키를 활용하여 주소를 얻는 함수 
function getAddressFromPrivateKey(privateKey) {
  // 프라이빗 키를 Buffer 형태로 변환합니다
  const privateKeyBuffer = Buffer.from(privateKey.replace(/^0x/, ''), 'hex');

  // 프라이빗 키로부터 주소를 생성합니다
  const addressBuffer = privateToAddress(privateKeyBuffer);

  // 주소를 16진수 형태로 변환하여 반환합니다
  return `0x${addressBuffer.toString('hex')}`;
}

//각각의 스마트 컨트랙트에 연결 
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_myAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_didURL",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contractID",
				"type": "uint256"
			}
		],
		"name": "addContractID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_didURL",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_publicKey",
				"type": "string"
			}
		],
		"name": "getDID",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DID",
		"outputs": [
			{
				"internalType": "string",
				"name": "publicKey",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_didURL",
				"type": "string"
			}
		],
		"name": "getDID",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "publicKey",
						"type": "string"
					},
					{
						"internalType": "uint256[]",
						"name": "contractTokenID",
						"type": "uint256[]"
					}
				],
				"internalType": "struct createDID.did",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0x8544642F7f8ca5cd68fAD8a23d2AD52ba9FB5DF3";
const didcontract = new web3.eth.Contract(abi, contractAddress);







// API endpoint - POST : /membership/:name 
// 회원가입 과정 (이름은 사용자 입력, 나머지는 자동 생성 후 DB상에 이름, DID 저장)
app.post('/membership/create/:name', async (req, res) => {
  try{
    const name = req.params.name;
      // 무작위의 이더리움 계정을 생성합니다.
    const account = web3.eth.accounts.create();

    // 프라이빗 키를 가져옵니다.
    const privateKey = account.privateKey;
    const publicKey = getECKeyPairFromPrivateKey(privateKey);

    // 이더리움 주소를 가져옵니다.
    const address = account.address;
    const didURL = `did:ethr:${address}`
   
    //블록체인 상에 사용자의 고유 DID를 저장합니다. 
    // 해당 함수의 인자 넣기
    const functionToCall = didcontract.methods.getDID(didURL, publicKey);

    (async () => {
      const gasEstimate = await functionToCall.estimateGas();
      const data = functionToCall.encodeABI();

      const transactionParameters = {
        to: contractAddress,
        gas: gasEstimate,
        data,
      };

      // 트랜잭션 서명 및 전송
      web3.eth.accounts.signTransaction(transactionParameters, privateKey).then((signedTransaction) => {
        web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).then((receipt) => {
          console.log('Transaction receipt:', receipt);
        }).catch((error) => {
          console.error('Transaction error:', error);
        });
      });
    })();

    // DB 상에 사용자를 저장합니다
    const sql = `INSERT INTO user_data (name, DID) VALUES (?, ?)`;
    connection.query(sql, [name, didURL], (err, result) => {
      if (err) throw err;
      console.log(`Item added with ID: ${result.insertId}`);
    });
    res.status(201).json({name, didURL});
  } catch{
    res.status(400).send({ message: 'Error : Create Membership', error});
  }
});

app.get('/membership/search/:privateKey', async(req, res) => {
  try{
    const privateKey = req.params.privateKey;
    const address = getAddressFromPrivateKey(privateKey);
    const didURL = `did:ethr:${address}`;
    const sql = `Select *  FROM user_data WHERE DID = did`;
    connection.query(sql, function (error, results) {
      if (error) throw error;
      console.log(results);
    });
    
  }catch{
    res.status(400).send({ message: 'Error : Wrong privateKey', error });
  }
})

app.post('/contract/add', async (req, res) => {
	
	try{
		let contract = req.body;
		res.status(201).json({ message: "Contract Received!", contract});
	}catch{
		res.status(400).send({ message: 'Error Contract', error });
	}
  });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
