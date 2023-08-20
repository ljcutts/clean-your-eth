// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity ^0.8.19;


contract SwapFee is Ownable {
   uint public fee;

   constructor(uint _fee) {
     fee = _fee;
   }

   function setFee(uint _fee) external onlyOwner {
     require(_fee < 100, "NOT_A_VALID_FEE");
     fee = _fee;
   }
   
   function payFee() external payable {
     address owner = payable(owner());
     uint amountForOwner = (1 * msg.value)/100;
     uint amountForSwapper = (99 * msg.value)/100;
     (bool success,  ) = payable(msg.sender).call{value: amountForSwapper}("");
     require(success, "Failed To Send Ether");
     (bool sent,  ) = owner.call{value: amountForOwner}("");
     require(sent, "Failed To Send Ether");
   }
   

   receive() external payable{}
   fallback() external payable{}
}

