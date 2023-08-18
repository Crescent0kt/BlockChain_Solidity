// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

//TODO::businessID
struct Career{
        //TODO:: 암호화된 career + businessID;
        uint businessID;
        string encodedData;

}

contract EmployeeCareer{
    //TODO::구조체 배열 -> 암호화된 이력 배열 
    Career[] careerList;


    mapping(uint=>address) findEmployee; //이력의 id => 이력서 주인
    mapping(address=>uint) careerCount;  //이력서 주인 => 보유 이력 수
    mapping(uint=>uint256) linkContract; //이력 => 근로계약서

    //TODO:: TEST! DELETE THIS LINE
    event endContractEvent(address indexed _employer, uint256 _tokenID);
    
    
    event plusCareer(address indexed _from,uint);
    event requestConfirm(address indexed _from,uint);
    

    //TODO::리턴값 -> 암호화된 이력, 암호화된값만 넘기려면 추가로 변경
    function getCareer(uint _ID) public view returns(Career memory){
        require(findEmployee[_ID] == msg.sender, "Caller is not the career owner");
        return careerList[_ID];
    }
    
    //TODO::암호화된 이력 저장
    function addCareer(Career memory career, uint256 tokenId) public{

        //endContractEvent에서 호출
        //1. 경력 저장
        career.businessID = careerList.length;
        careerList.push(career);
        
        //2. 매핑
        findEmployee[careerList.length - 1] = msg.sender;       //이력ID와 사용자 주소 저장
        careerCount[msg.sender] = careerCount[msg.sender] + 1;  //사용자 이력 수 + 1 
        linkContract[careerList.length - 1] = tokenId;

        //이력 등록 완료 이벤트 발생
        emit plusCareer(msg.sender, careerList.length-1);
    }
    //TODO::암호화된 이력 저장
    //linkContract유무
     function addCareerSelf(Career memory career) public{

        //1. 경력 저장
        career.businessID = careerList.length;
        careerList.push(career);

        //2. 매핑
        findEmployee[careerList.length - 1] = msg.sender;       //이력ID와 사용자 주소 저장
        careerCount[msg.sender] = careerCount[msg.sender] + 1;  //사용자 이력 수 + 1 

        //TODO:: uint?
        emit plusCareer(msg.sender, careerList.length-1);
    }


    //TODO::암호화된 값을 넘겨줘야됨 => js에서 넣고 암호화해서 전달
    function setCareerEnd(uint _ID,Career memory userCareer,address boss) public {
        require(findEmployee[_ID] == msg.sender, "Caller is not the career owner");
        careerList[_ID] = userCareer;
        
        //보스에게 서명 요청 이력 전달
        emit requestConfirm(boss,_ID);
    }
    
    //TODO::서명부 패스
    // function addConfirm(uint _ID ,string memory _confirm) public {
    //     require(findEmployee[_ID] == msg.sender, "Caller is not the career owner");
    //     Career memory userCareer =  careerList[_ID];
    //     userCareer.confirm = _confirm;
    //     careerList[_ID] = userCareer;
    // }
}