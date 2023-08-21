// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

contract createDID {

    struct did {
        string publicKey;
        uint[] contractTokenID;
    }

    mapping(string => did) myDID;
    did public DID;

    //DID 발급 함수 
    function getDID(string memory _didURL, string memory _publicKey) public {
        

        DID = did(_publicKey, new uint[](0));

        myDID[_didURL] = DID;
    }

    //계약서 작성한 경우 계약서 nft ID를 DID상에 추가하는 기능 
    function addContractID(address _myAddress, string memory _didURL, uint _contractID) public {
        require(msg.sender == _myAddress);

        myDID[_didURL].contractTokenID.push(_contractID);
        
    }

    function getDID(string memory _didURL) public view returns (did memory){
        return myDID[_didURL];
    }

}