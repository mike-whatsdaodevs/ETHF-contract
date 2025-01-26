// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TEST is ERC20 {

    constructor() ERC20("TEST", "TEST") {
        _mint(msg.sender, 1_000_000E18);
    }

    
}
