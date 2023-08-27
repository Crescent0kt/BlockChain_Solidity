// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

 contract EmploymentContract is ERC721, ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;        
    constructor() ERC721("DIDToken", "KNFT") {}

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }



    struct AgreementSol{
        // 사업주, 근로자 이름 
        string employer;
        string employee;

        // 근무로로 계약 기간 시작일 
        uint16 start_year;
        uint8 start_month;
        uint8 start_day; 

        // 근로 계약 기간 종료일 
        uint16 end_year;
        uint8 end_month;
        uint8 end_day; 

        string location; // 근무 장소
        string job; // 업무의 내용 

        // 소정근로시간  
        uint16 start_time; 
        uint16 end_time; 

        //휴게시간
        uint16 start_restTime;
        uint16 end_restTime; 

        uint8 work_day; //근무일 주 n회 
        string holiday; //주휴일 매주 n요일

        uint8 salary; // 1 : 월급, 2 : 일급, 3 : 시급 
        uint32 payment; // 급여 정보 

        bool hasBonus; // 상여급을 받는지 유무 
        uint32 bonus; // 상여급 

        bool hasOther; // 기타급여 받는지 의무 
        uint32 other_salary; // 기타급여 

        bool payCheck; // 임금지급 기간 1 : 매월 기준, 2 : 매주 기준, 3: 일급이므로 설정 없음 
        string payday; // 임급지급 날짜 ex) 15 or 월

        bool account; // 임금 지급 방법 

        // 사회보험 적용 여부 
        bool insurance1; // 고용보험 
        bool insurance2; // 산재보험 
        bool insurance3; // 국민연금 
        bool insurance4; // 건강보험 

        // 작성 기준 날짜 
        uint256 create_time;


        //사업주, 근로자 디지털서명  
        string employerSign;
        string employeeSign; 
    }

    Counters.Counter private _tokenIDs; // 토큰 ID 카운터를 위한 변수
    mapping(address => AgreementSol) AgreementList; // 계약서 내용을 전달하기 위한 매핑
    mapping(uint256 => address) tokenToEmployee; 
    mapping(uint256 => AgreementSol) IDToContract;
    event transferEmployeeEvent(address _employee); // 근로자에게 계약서 전송을 완료한 뒤에 이를 알려주기 위해 발생하는 이벤트
    event transferEmployerEvent(address _employer); // 사업주에게 계약서 서명을 완료한 뒤에 전송을 완료한 후 이를 알려주기 위해 발생하는 이벤트 
    event plusEmployee(address _employer, address _employee); // 계약 완료 후 사업장에 직원을 추가하기 위해 발생시키는 이벤트
    event endContractEvent(address _employer, uint256 _tokenID); // 토큰을 발행하고 이력 추가를 위해 발행하는 이벤트 

    // 근로자에게 계약서 및 서명을 전송하는 함수 
    function sendToEmployee(address _to, AgreementSol calldata _data) public {
        AgreementList[_to] = _data;
        emit transferEmployeeEvent(_to);
    }

    // 사업주에게 서명을 전송하는 함수 
    function sendToEmployer(address _to,  AgreementSol calldata _data) public {
        AgreementList[_to] = _data;
        emit transferEmployerEvent(_to);
    }

    function mintNFT(address _employer, address _employee, AgreementSol memory _contract) public returns (uint256) {
        _tokenIDs.increment();

        uint256 newItemId = _tokenIDs.current();
        _safeMint(_employer, newItemId);

        // 정해진 데이터를 매핑에 저장
        IDToContract[newItemId] = _contract;

        emit plusEmployee(_employer, _employee);
        emit endContractEvent(msg.sender, newItemId);
        
        return newItemId;
    }

    
    function getAgreement(uint256 _tokenID) public view returns (AgreementSol memory) {
        
    }

    function checkAgreement() public view returns (AgreementSol memory){
        return AgreementList[msg.sender];
    }

    

 }