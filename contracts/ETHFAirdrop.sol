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

contract ETHFAirdrop is
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable
{   
    uint256 public constant totalClaimTimes = 24;
    uint256 public totalAmount;
    uint256 public totalVestedToken;
    mapping(address => uint256) public claimed;
    mapping(address => uint256) public WhiteListAmounts;

    struct ClaimInfo {
        uint256 nextClaimTime;
        uint256 claimTimes;
    }

    mapping(address => ClaimInfo) public claimInfo;

    address public immutable ETHF;


    event Claimed(address send, uint256 amount);

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
        totalAmount = 20_000_000 * 1E18;
    }

//// (voted token / total voted token) * 20 M tokens  = available amount

//// monthly amount = available amount / totalClaimTimes;
    
    function claim() public whenNotPaused nonReentrant {
        ClaimInfo memory info = claimInfo[msg.sender];
        require(info.claimTimes < totalClaimTimes, "E: can not claim again!");
        require(info.nextClaimTime < block.timestamp, "E: claimed!");
        require(WhiteListAmounts[msg.sender] != 0 , "E: Not Eligible");

        uint256 amount = eachTimeClaimAmount(msg.sender);
        IERC20(ETHF).transfer(msg.sender, amount);

        claimed[msg.sender] += amount;

        claimInfo[msg.sender].claimTimes += 1;
        claimInfo[msg.sender].nextClaimTime = block.timestamp + 30 days;

        emit Claimed(msg.sender, amount);
    }

    function takeBackToken() external onlyOwner {
        uint256 tokenBalance = IERC20(ETHF).balanceOf(address(this));
        IERC20(ETHF).transfer(msg.sender, tokenBalance);
    }

    function addWhiteListAmounts(
        address[] calldata addrs,
        uint256[] calldata amounts
    ) external {
        uint256 length = addrs.length;
        for (uint256 i = 0; i < length; ) {
            address addr = addrs[i];
            uint256 amount = amounts[i];
            WhiteListAmounts[addr] += amount;
            totalVestedToken += amount;
            unchecked {
                ++i;
            }
        }
    }

    function resetWhiteListAmounts(
        address[] calldata addrs
    ) external {
        uint256 length = addrs.length;
        for (uint256 i = 0; i < length; ) {
            address addr = addrs[i];

            totalVestedToken -= WhiteListAmounts[addr];
            WhiteListAmounts[addr] = 0;

            unchecked {
                ++i;
            }
        }
    }

    function manageTotalAmount(uint256 amount) external onlyOwner {
        totalAmount = amount;
    }

    function eachTimeClaimAmount(address account) public view returns (uint256) {
        return availableToClaim(account) / totalClaimTimes;
    }

    function availableToClaim(address account) public view returns (uint256) {
        return (WhiteListAmounts[account] * totalAmount) / totalVestedToken;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    /// uups interface
    function _authorizeUpgrade(
        address newImplementation
    ) internal view override onlyOwner {}
}