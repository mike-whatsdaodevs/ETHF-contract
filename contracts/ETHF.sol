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

    mapping(address => bool) public BL;

    function initialize(address initialOwner) external initializer {
        __Pausable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __ERC20_init("ETHFINA", "ETHF");

       _mint(msg.sender, 1_000_000_000E18);

    }

    function _update(address from, address to, uint256 value) internal virtual override {
        require(!BL[from] && !BL[to], "E: Blocked Address!"); 
        super._update(from, to, value);
    }

    function batchAddBL(address[] calldata addrs) external onlyOwner {
        uint256 length = addrs.length;
        for (uint256 i = 0; i < length; ) {
            address addr = addrs[i];
            BL[addr] = true;
            unchecked {
                ++i;
            }
        }
    }

    function batchRemoveBL(address[] calldata addrs) external onlyOwner {
        uint256 length = addrs.length;
        for (uint256 i = 0; i < length; ) {
            address addr = addrs[i];
            delete BL[addr];
            unchecked {
                ++i;
            }
        }
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
