//SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.4 ;

import "./RuinNFT.sol";

contract RuinNFTV2 is RuinNFT{
    function test() external pure returns (string memory) {
        return "upgrade";
    }
}