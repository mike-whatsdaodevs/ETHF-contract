// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Stake is
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{

    address public immutable ETHF;

    /* ========== CONSTRUCTOR ========== */
    constructor(address ethfToken) {
        _disableInitializers();
        ETHF = ethfToken;
    }

    function initialize(address initialOwner) external initializer {
        __Pausable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();

    }


    /// uups interface
    function _authorizeUpgrade(
        address newImplementation
    ) internal view override onlyOwner {}
}