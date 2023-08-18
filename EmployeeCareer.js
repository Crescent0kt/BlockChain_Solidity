const abi = require('./EmployeeData');
const {
  privateKey,
  contractAddress,
  webSocketProvider,
  web3,
  account,
  myAddress,
  contract
} = require('./EmployeeData');

class EmployeeCareer {

    constructor() {
        this.privateKey = privateKey;
        this.contractAddress = contractAddress;
        this.webSocketProvider = webSocketProvider;
        this.web3 = web3;
        this.account = account;
        this.myAddress = myAddress;
        this.contract = contract;

        this.web3.eth.accounts.wallet.add(account);
        this.initEvents();
    }

    //필요한 이벤트 등록
    async initEvents() {
      this.endContractSubscribe();
      this.requestConfirmSubscribe();
      this.plusCareerSubscribe();
    }

    // Call solidity method
    // 느리면 테스트로 코드 수정
    async sendTx(_method) {
      const encodedABI = _method.encodeABI();
      const estimatedGas = await _method.estimateGas();
      const nonce = await this.web3.eth.getTransactionCount(this.account.address);
      const gasPrice = await this.web3.eth.getGasPrice();
      
      //TODO::Test
      // const customGasPrice = Math.floor(parseInt(gasPrice) * 1.5);
      
      const rawTransaction = {
        from: this.account.address,
        to: this.contract.options.address,
        data: encodedABI,
        gasLimit: this.web3.utils.toHex(estimatedGas),
        gasPrice: this.web3.utils.toHex(gasPrice),
        nonce: nonce,

        //TODO::Test
        // gasLimit: this.web3.utils.toHex(estimatedGas)*3,
        // gasPrice: this.web3.utils.toHex(customGasPrice),
      };
    
      const tx = await this.web3.eth.accounts.signTransaction(rawTransaction, this.privateKey);
    
      return this.web3.eth.sendSignedTransaction(tx.rawTransaction)
        .on('transactionHash', (hash) => {
          console.log('transactionHash:', hash);
        })
        .on('receipt', (receipt) => {
          console.log('receipt:', receipt);
        })
        .on('error', (error) => {
          console.error('sendSignedTransaction error:', error);
        });
    }


    async endContractSubscribe(){
      //TODO:: agreementSol 이벤트 리스너, 연동필요 this->agreementSol
      const EventSign = this.web3.utils.keccak256("endContractEvent(address,uint256)");
      const topic = this.web3.eth.abi.encodeParameter('address', this.account.address);
      const subscription = await this.web3.eth.subscribe('logs', {
        address: this.contractAddress,
        topics: [EventSign,topic],
      
      }, function(error, result){});
      subscription.on('data', async (log) => {
        console.log("GetEndContractEvent");
        console.log(log.data);
 
        const decodedData = this.web3.eth.abi.decodeParameters(
            ['uint256'], // ABI 파라미터 타입 목록
            log.data // 로그에서 추출된 데이터 영역
        );
        const tokenId = Number(decodedData['0']);

        //TODO::여기 contract -> 근로계약서쪽 contract로 바꿔야됨
        const agreement = await this.contract.methods.getAgreement(_tokenId).call({from: myAddress});

        const career = {
          businessID: 0,
          place: agreement.location,
          boss: _boss,
          work_start_year: agreement.start_year,
          work_start_month: agreement.start_month,
          work_start_day: agreement.start_day,
          work_end_year: 0,
          work_end_month: 0,
          work_end_day: 0,
        };   
        //TODO:: 여기서 career 암호화해서 전달

        const result = await this.sendTx(this.contract.methods.addCareer(career, tokenId));
    });
 }
    
    //event2 requestConfirm
    async requestConfirmSubscribe(){
      console.log("requestConfirmSubscribe");
      const EventSign = this.web3.utils.keccak256("requestConfirm(address,uint256)");
      const topic = this.web3.eth.abi.encodeParameter('address', this.account.address);
      const subscription = await this.web3.eth.subscribe('logs', {
        address: this.contractAddress,
        topics: [EventSign,topic],
      
      }, function(error, result){});
      subscription.on('data', async (log) => {
        console.log("GetrequestConfirm");
        const decodedData = this.web3.eth.abi.decodeParameters(
          ['uint256'], // ABI 파라미터 타입 목록
          log.data // 로그에서 추출된 데이터 영역
      );
      const Id = Number(decodedData['0']);
      addConfirm(Id);
      }); 
      
    }
    //event3 plusCareer
    async plusCareerSubscribe(){
      console.log("plusCareerSubscribe");
      const EventSign = this.web3.utils.keccak256("plusCareer(address,uint256)");
      const topic = this.web3.eth.abi.encodeParameter('address', this.account.address);
      const subscription = await this.web3.eth.subscribe('logs', {
        address: this.contractAddress,
        topics: [EventSign,topic],
      
      }, function(error, result){});
      subscription.on('data', async (log) => {
        console.log("plusCareer");
        console.log(log.data);
        const decodedData = this.web3.eth.abi.decodeParameters(
            ['uint256'], // ABI 파라미터 타입 목록
            log.data // 로그에서 추출된 데이터 영역
        );
        const Id = Number(decodedData['0']);
        //TODO::여기서 GUI갱신
    
      }); 
    }

  
    async addCareerSelf(_place,_start_year,_start_month,_start_day,_end_year,_end_month,_end_day) {
  
      const career = {
        businessID: 0,
        place: _place,
        boss: "0x0000000000000000000000000000000000000000",
        work_start_year: _start_year,
        work_start_month: _start_month,
        work_start_day: _start_day,
        work_end_year: _end_year,
        work_end_month: _end_month,
        work_end_day: _end_day,
        confirm: "x",
      };
      //TODO:: 여기서 암호화 필요

      const result = await this.sendTx(this.contract.methods.addCareerSelf(career));
  
  }
  
  //TODO:: 해당 함수들은 보류
  async addConfirm(_ID){

   // const result = await this.contract.addConfirm(_ID,confirm);
  }


   async setCareerEnd(_ID) {
  //   const now = this.getDate();
  
  //   const career= await this.contract.methods.getCareer(_ID).call({from:this.myAddress});
  //   //TODO:: 예상:encode된 값 decode해서 종료시점 기록 후 encode해서 다시 저장
  
  //   decodeCareer.work_end_year = now.year;
  //   decodeCareer.work_end_month = now.month;
  //   decodeCareer.work_end_day = now.day;
  
  //  TODO:: 인자에 맞춰서 솔리디티 수정 필요
  //   const result = await sendTx(this.contract.methods.setCareerEnd());
  
  //   console.log("종료 시점 기록 완료");
  
   }
  
  
  async getDate(){
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const koreanTime = new Date(utc + KR_TIME_DIFF);
    
    const year = koreanTime.getFullYear();
    const month = koreanTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = koreanTime.getDate();
  
  
    return {
      year : year,
      month : month,
      day : day
    };
  }
}

export default EmployeeCareer;