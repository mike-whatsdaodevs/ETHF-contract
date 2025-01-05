// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./Errors.sol";

contract ETHFStakeStaticPool is
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    using Address for address payable;
    using SafeERC20 for IERC20;

    IERC20 public immutable ETHF;
    address payable public immutable vault;

    // Reward to be paid out per second
    uint256 public rewardRate;
    uint256 public locktime;

    // User address => rewards to be claimed
    mapping(address => uint256) public rewards;
    
    // User address => claimed
    mapping(address => uint256) public claimed;

    // Total staked
    uint256 public totalStaked;
    // User address => staked amount
    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public startTime;
    mapping(address => uint256) public updateTime;

    /// mimimum amount 0.1 e
    uint256 public minAmount;

    /* ========== CONSTRUCTOR ========== */
    constructor(IERC20 _ethfToken, address payable _vault) {
        _disableInitializers();
        ETHF = _ethfToken;
        vault = _vault;
    }

    function initialize(address _initialOwner) external initializer {
        __Pausable_init();
        __Ownable_init(_initialOwner);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        minAmount = 1E17;
    }

    modifier updateReward(address _account) {
        if(_account == address(0)) revert InvalidAccount();
        rewards[_account] = earned(_account);
        updateTime[_account] = block.timestamp;
        _;
    }

    function lastTimeRewardApplicable(address _account) public view returns (uint256) {
        uint256 start = startTime[_account];
        if (start + locktime < block.timestamp) {
            return block.timestamp;
        }
        return updateTime[_account];
    }

    /// each token earned
    function rewardPerToken(address _account) public view returns (uint256) {
        return rewardRate * (block.timestamp - lastTimeRewardApplicable(_account)) * 1E18;
    }

    function stake() external payable updateReward(msg.sender) {
        if(msg.value < minAmount) revert InvalidAmount(msg.value);
        vault.sendValue(msg.value);
        balanceOf[msg.sender] += msg.value;
        totalStaked += msg.value;
    }

    function withdraw(uint256 _amount) external updateReward(msg.sender) {
        if(_amount == 0) revert InvalidAmount(0);
        balanceOf[msg.sender] -= _amount;
        totalStaked -= _amount;
        payable(msg.sender).sendValue(_amount);
    }

    function earned(address _account) public view returns (uint256) {
        return balanceOf[_account] * rewardPerToken(_account);
    }

    function getReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            claimed[msg.sender] += reward;
            ETHF.safeTransfer(msg.sender, reward);
        }
    }

    function _min(uint256 x, uint256 y) private pure returns (uint256) {
        return x <= y ? x : y;
    }

    /// uups interface
    function _authorizeUpgrade(
        address newImplementation
    ) internal view override onlyOwner {}
}