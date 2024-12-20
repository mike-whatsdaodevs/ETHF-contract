// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHF is ERC20, Ownable {
    constructor() ERC20("ETHF", "ETHF") Ownable(msg.sender) {
        _mint(msg.sender, 1000E18);
    }

    function mint(address account, uint256 amount)
        external
        onlyOwner
    {
        super._mint(account, amount);
    }

    function burn(address account, uint256 amount) 
        external 
        onlyOwner 
    {
        super._burn(account, amount);
    }
}
