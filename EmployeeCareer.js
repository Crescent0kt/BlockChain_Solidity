import Web3 from 'web3';
const abi = require('./contractABI.json');
class EmployeeCareer {
    constructor() {
        this.INFURA_API_KEY = '9e60dbf8034f48aa95b9f153bc41d439';
        this.INFURA_network = 'sepolia';
        this.privateKey = '0x30237b0a43c0d329842ffbdcb4684be1acd49be8213ba4e5f75b63d869e7da55';
        this.contractAddress = "0x947813d201B15A07E58787B54CD946543d11f170";
        
        //WSPROVIDER
        this.INFURA_url = `wss://${this.INFURA_network}.infura.io/ws/v3/${this.INFURA_API_KEY}`;
        this.webSocketProvider = new Web3.providers.WebsocketProvider(this.INFURA_url);
        
        this.web3 = new Web3(this.webSocketProvider);
        // this.web3.eth.accounts.wallet.add(account);
        
        this.account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
        this.myAddress = this.account.address;
        
        this.contractABI = abi;
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        //console.log('contract:', this.contract);

        this.initEvents();
    }

    async initEvents() {
      this.endContractSubscribe();
      this.requestConfirmSubscribe();
      this.plusCareerSubscribe();
    }

    // 솔리디티 함수 호출용
    async sendTx(_method) {
      const encodedABI = _method.encodeABI();
      const estimatedGas = await _method.estimateGas();
      const nonce = await this.web3.eth.getTransactionCount(this.account.address);
      const gasPrice = await this.web3.eth.getGasPrice();
      
      //TODO::느려서 속도올리려고 씀
      const customGasPrice = Math.floor(parseInt(gasPrice) * 1.5);
      
      const rawTransaction = {
        from: this.account.address,
        to: this.contractAddress,
        data: encodedABI,
        gasLimit: this.web3.utils.toHex(estimatedGas)*3,
        gasPrice: this.web3.utils.toHex(customGasPrice),
        nonce: nonce,
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
       console.log("endContractSubscribe");
      //(완):: 이벤트 전달 값에 사장님 주소 보내줘야됨? ->필요없다고함
      //TODO:: 준형쪽 이벤트 리스너임.
      //이쪽이벤트는 다른컨트랙트에서 발생하는이벤트임을 알아야함
      const EventSign = this.web3.utils.keccak256("endContractEvent2(address,uint256)");
      const topic = this.web3.eth.abi.encodeParameter('address', this.account.address);
      const subscription = await this.web3.eth.subscribe('logs', {
        address: this.contractAddress,
        topics: [EventSign,topic],
      
      }, function(error, result){});
      subscription.on('data', async (log) => {
        console.log("GetEndContractEvent");
        console.log(log.data);
 
        // 여기서 에러가 발생했다면, 이제 수정된 코드에서 정상적으로 실행되어야 합니다.
        const decodedData = this.web3.eth.abi.decodeParameters(
            ['uint256'], // ABI 파라미터 타입 목록
            log.data // 로그에서 추출된 데이터 영역
        );
          const tokenId = Number(decodedData['0']);
          console.log(tokenId);
          await this.addCareer(tokenId);
    });
 }
    
    //event2 requestConfirm
    async requestConfirmSubscribe(){
      console.log("requestConfirmSubscribe");
      //1. requestConfirm
      const EventSign = this.web3.utils.keccak256("requestConfirm(address,uint256)");
      //listener address
      const topic = this.web3.eth.abi.encodeParameter('address', this.account.address);
      const subscription = await this.web3.eth.subscribe('logs', {
        address: this.contractAddress,
        topics: [EventSign,topic],
      
      }, function(error, result){});
      subscription.on('data', function(log){
        console.log("GetrequestConfirm");
        const decodedData = this.web3.eth.abi.decodeParameters(
          ['uint256'], // ABI 파라미터 타입 목록
          log.data // 로그에서 추출된 데이터 영역
      );
      const Id = Number(decodedData['0']);
      console.log("addConfirm");
      addConfirm(Id);
      }); 
      
    }
    //event3 plusCareer
    async plusCareerSubscribe(){
      console.log("plusCareerSubscribe");
      const EventSign = this.web3.utils.keccak256("plusCareer(address,uint256)");
      //listener address
      const topic = this.web3.eth.abi.encodeParameter('address', this.account.address);
      const subscription = await this.web3.eth.subscribe('logs', {
        address: this.contractAddress,
        topics: [EventSign,topic],
      
      }, function(error, result){});
      subscription.on('data', async function(log){
        console.log("plusCareer");
        const decodedData = this.web3.eth.abi.decodeParameters(
          ['uint256'], // ABI 파라미터 타입 목록
          log.data // 로그에서 추출된 데이터 영역
      );
        const Id = Number(decodedData['0']);
        //TODO::여기서 GUI갱신
    
        
      }); 
    }

    async addCareer(_tokenId) {
      //여기 contract -> 근로계약서쪽 contract test로/지금은 내 컨트랙트넣음
  
        //TODO::여기 풀어주기
        //const agreement = await contract.methods.getAgreement(_tokenId).call({from: myAddress});
        // const career = {
        //   businessID: 0,
        //   place: agreement.location,
        //   boss: _boss,
        //   work_start_year: agreement.start_year,
        //   work_start_month: agreement.start_month,
        //   work_start_day: agreement.start_day,
        //   work_end_year: 0,
        //   work_end_month: 0,
        //   work_end_day: 0,
        //   confirm: "x",
        // };
        //console.log(career);
  
  
        //TODO:: 여기서 career 암호화해서 전달
    
        const career = {
          businessID: 0,
          encodedData:"aaa",
          
        };
        const result = await this.sendTx(this.contract.methods.addCareer(career, _tokenId));
    }
  
    //프론트에서 값 입력받을거 다 가지고오는 거, 구조체로 넘겨도 될듯
    async addCareerSelf(_place,_start_year,_start_month,_start_day,_end_year,_end_month,_end_day) {
  
      // const career = {
      //   businessID: 0,
      //   place: _place,
      //   boss: "0x0000000000000000000000000000000000000000",
      //   work_start_year: _start_year,
      //   work_start_month: _start_month,
      //   work_start_day: _start_day,
      //   work_end_year: _end_year,
      //   work_end_month: _end_month,
      //   work_end_day: _end_day,
      //   confirm: "x",
      // };
      //TODO:: 여기서 암호화 필요
      const career = {
        businessID: 0,
        encodedData:"aaa",
        
      };
      const result = await this.sendTx(this.contract.methods.addCareerSelf(career));
  
  }
  
  //TODO:: 해당 코드는 보류

  // async addConfirm(_ID){
  //   //TODO:: 사장 개인키로 잠금 임시로해놓음
  //   const confirm = "yes";
  //   //TODO:: 서명을 받을 것인가 물어보는 위치
    
  //   const result = await this.contract.addConfirm(_ID,confirm);
  // }



  // //TODO::_ID는 DB에저장?
  // async setCareerEnd(_ID) {
  //   const now = this.getDate();
  
  //   const career= await this.contract.methods.getCareer(_ID).call({from:this.myAddress});
  //   //TODO:: career복호화 정보빼와야됨
  
  //   decodeCareer.work_end_year = now.year;
  //   decodeCareer.work_end_month = now.month;
  //   decodeCareer.work_end_day = now.day;
  //   const boss = decodeCareer.boss;
  
  //   //TODONOW:: career 암호화, setCareer 바꿔야됨
  //   const result = await sendTx(this.contract.methods.setCareerEnd(0, career,boss));
  
  //   console.log("종료 시점 기록 완료");
  
  // }
  
  
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