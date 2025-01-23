// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;
import {ERC20Upgradeable as ERC20} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {OwnableUpgradeable as Ownable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";

contract ETHF is ERC20, Ownable, UUPSUpgradeable, PausableUpgradeable  {

    constructor() {
        _disableInitializers();
    }

    function initialize(address initialOwner) external initializer {
        __Pausable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __ERC20_init("ETHFINA", "ETHF");

       _mint(msg.sender, 1_000_000_000E18);

    }

    function name() public view override returns (string memory) {
        return "ETHFINA";
    }

     /// uups interface
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        view
        onlyOwner
    { }

}
