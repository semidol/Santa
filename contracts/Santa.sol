// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Santa is ERC721, Ownable {
  uint256 public maxSupply;
  uint256 public totalSupply;
  uint256 private _nextTokenId = 0;
  address private _withdrawalReciever;
  string metadata = 'https://bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna.ipfs.dweb.link/';

  constructor(uint256 initialMaxSupply, address initialWithdrawalReceiver)
   ERC721("Santa", "SNT")
   Ownable(msg.sender)
  {
    maxSupply = initialMaxSupply;
    _withdrawalReciever = initialWithdrawalReceiver;
  }
  
  function mint(uint256 amount) payable public {
    string memory requireMaxSupplyMessage = string(abi.encodePacked('totalSupply should be <= ', Strings.toString(maxSupply)));
    require(totalSupply + amount <= maxSupply, requireMaxSupplyMessage);
    require(msg.value == amount * 0.001 ether, 'user should send 0.001 ether for each token');
    require(amount <= 3, 'one minting amount should be <= 3');
    require(balanceOf(msg.sender) + amount <= 6, 'balance of user shoul be <= 6');

    for (uint256 index = 0; index < amount; index++) {
      uint256 tokenId = _nextTokenId + 1;
      _nextTokenId ++;
      totalSupply ++;
      _mint(msg.sender, tokenId);
    }
  }

  function withdraw() public onlyOwner() {
    payable(_withdrawalReciever).transfer(address(this).balance);
  }

  function tokenURI(uint256 tokenId) public override view returns (string memory) {
    return string(abi.encodePacked(metadata, Strings.toString(tokenId)));
  }
}
