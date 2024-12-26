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
import "@openzeppelin/contracts-upgradeable/utils/cryptography/EIP712Upgradeable.sol";

contract ETHFAirdrop is
    OwnableUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable,
    ReentrancyGuardUpgradeable,
    EIP712Upgradeable
{
    struct Message {
        address sender;
        address token;
        uint256 amount;
        uint256 expiration;
    }

    // Type hash (EIP-712 Typed Data)
    bytes32 public constant MESSAGE_TYPEHASH = keccak256(
        "Message(address sender,address token,uint256 amount,uint256 expiration)"
    );

    address public signer;
    mapping(address => uint256) public claimed;
    address public immutable ETHF;

    /* ========== CONSTRUCTOR ========== */
    constructor(address ethfToken) {
        _disableInitializers();
        ETHF = ethfToken;
    }

    function initialize(address initialOwner, address signerAddress) external initializer {
        __Pausable_init();
        __Ownable_init(initialOwner);
        __UUPSUpgradeable_init();
        __ReentrancyGuard_init();
        __EIP712_init("ETHFAIRDROP", "1");

        signer = signerAddress;
    }

    function claim(
        uint256 amount,
        uint256 expiration,
        bytes calldata signature
    ) public whenNotPaused nonReentrant {
        require(claimed[msg.sender] == 0 , "E: claimed");
        require(
            block.timestamp < expiration,
            "signature expired"
        );

        bytes32 hash = keccak256(
            abi.encode(ETHF, msg.sender, amount, expiration)
        );
        bytes32 messageHash = MessageHashUtils.toEthSignedMessageHash(hash);
        address recoveryAddress = ECDSA.recover(messageHash, signature);
        require(recoveryAddress == signer,"invalid signature");

        IERC20(ETHF).transfer(msg.sender, amount);

        claimed[msg.sender] = amount;
    }

    function verifyCheck(
        address to,
        uint256 amount,
        uint256 expiration,
        bytes calldata signature
    ) public view returns(address) {
        bytes32 hash = keccak256(
            abi.encode(ETHF, to, amount, expiration)
        );
        bytes32 messageHash = MessageHashUtils.toEthSignedMessageHash(hash);
        address recoveryAddress =  ECDSA.recover(messageHash, signature);
        require(
            block.timestamp < expiration,
            "Signature expired"
        );
        return recoveryAddress;
    }

    function managerSigner(address newSigner) external onlyOwner {
        require(signer != address(0), "E: address error");
        signer = newSigner;
    }

    function encodeSigData(
        address to,
        uint256 amount,
        uint256 expiration
    ) external view returns (bytes32) {
        return keccak256(
            abi.encode(ETHF, to, amount, expiration)
        );
    }

    function takeBackToken() external onlyOwner {
        uint256 tokenBalance = IERC20(ETHF).balanceOf(address(this));
        IERC20(ETHF).transfer(msg.sender, tokenBalance);
    }

    // Hash the message (EIP-712 compliant)
    function hashMessage(Message memory message) public view returns (bytes32) {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        MESSAGE_TYPEHASH,
                        message.sender,
                        message.token,
                        message.amount,
                        message.expiration
                    )
                )
            );
    }

    // Verify the signature
    function verifyUser(
        Message memory message,
        bytes memory signature
    ) public view returns (bool) {
        require(message.expiration < block.timestamp, "E: expiration");
        // Hash the message
        bytes32 digest = hashMessage(message);

        // Recover the signer
        address recoveredSigner = ECDSA.recover(digest,signature);

        // Check if the signer is the `from` address
        return recoveredSigner == message.sender;
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