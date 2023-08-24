const { Web3 } = require('web3');


const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

const abi = [
	{
		"inputs": [],
		"name": "Hello",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_myAddress",
				"type": "address"
			}
		],
		"name": "testEvent",
		"type": "event"
	}
];

const contractAddress = "0x6321f763e2Ff8D887195e41FF7199A6B94E3F3Ff";
const testContract = new web3.eth.Contract(abi, contractAddress);

(async() => {
	const subscription = await web3.eth.subscribe('testEvent');

	// note that in version 4.x the way you get notified for `data` and `error` has changed
	subscription.on('data', async blockhead => {
		console.log('New block header: ', blockhead);
	});
	subscription.on('error', error =>
		console.log('Error when subscribing to New block header: ', error),
	);

});

(async() => {
	testContract.methods.Hello()
	.send({from : '0x93F89438A621350Fc3C18E5f5b3E38ACb0ebD9eF'})
	.on("receipt", function(receipt){
		console.log('Transaction Success!');
	})
	.on("error", function(error){
		console.log('Transaction Error!');
	})
});


// in 4.x

