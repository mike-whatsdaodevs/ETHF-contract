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

contract ETHFStakeDynamicPool is
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{
    using Address for address payable;
    using SafeERC20 for IERC20;

    IERC20 public immutable ETHF;
    address payable public immutable vault;

    // Timestamp of when the rewards finish
    uint256 public finishAt;
    // Minimum of last updated time and reward finish time
    uint256 public updatedAt;
    // Reward to be paid out per second
    uint256 public rewardRate;
    // Sum of (reward rate * dt * 1e18 / total supply)
    uint256 public rewardPerTokenStored;
    // User address => rewardPerTokenStored
    mapping(address => uint256) public userRewardPerTokenPaid;
    // User address => rewards to be claimed
    mapping(address => uint256) public rewards;

    // Total staked
    uint256 public totalSupply;
    // User address => staked amount
    mapping(address => uint256) public balanceOf;

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
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }

        _;
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return _min(finishAt, block.timestamp);
    }


    /// based on time
    function rewardPerToken() public view returns (uint256) {
        if (totalSupply == 0) {
            return rewardPerTokenStored;
        }

        return rewardPerTokenStored
            + (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18)
                / totalSupply;
    }

    function stake() external payable updateReward(msg.sender) {
        require(msg.value > minAmount, "E: amount must exceed minimum amount");
        vault.sendValue(msg.value);
       // stakingToken.transferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] += msg.value;
        totalSupply += msg.value;
    }

    function withdraw(uint256 _amount) external updateReward(msg.sender) {
        require(_amount > 0, "E: amount = 0");
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        /// stakingToken.transfer(msg.sender, _amount);
        payable(msg.sender).sendValue(_amount);
    }

    function earned(address _account) public view returns (uint256) {
        return (
            (
                balanceOf[_account]
                    * (rewardPerToken() - userRewardPerTokenPaid[_account])
            ) / 1e18
        ) + rewards[_account];
    }

    function getReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];
        if (reward > 0) {
            rewards[msg.sender] = 0;
            ETHF.transfer(msg.sender, reward);
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