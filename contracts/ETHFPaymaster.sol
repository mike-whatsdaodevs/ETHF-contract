// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@account-abstraction/contracts/core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract ETHFPaymaster is BasePaymaster {

    using SafeERC20 for IERC20;

    uint256 public constant SIG_VALIDATION_FAILED = 1;
    uint256 internal constant TOKEN_DATA_OFFSET = PAYMASTER_DATA_OFFSET + 20;
    uint256 internal constant RATE_DATA_OFFSET = TOKEN_DATA_OFFSET + 32;
    uint256 internal constant SIG_EXPIRATION_DATA_OFFSET = RATE_DATA_OFFSET + 32;

    mapping(address => bool) public allowedToken;

    address public signer;

   	constructor(IEntryPoint _entryPoint, address _signer) BasePaymaster(_entryPoint) {
        signer = _signer;
   	}

   	function _validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) internal virtual override returns (bytes memory context, uint256 validationData) {
        address sender = userOp.sender;
        address token = address(bytes20(userOp.paymasterAndData[PAYMASTER_DATA_OFFSET: TOKEN_DATA_OFFSET]));
        uint256 rate = uint256(bytes32(userOp.paymasterAndData[TOKEN_DATA_OFFSET: RATE_DATA_OFFSET]));
        uint256 expirationTime = uint256(bytes32(userOp.paymasterAndData[RATE_DATA_OFFSET: SIG_EXPIRATION_DATA_OFFSET]));
        bytes memory sig = userOp.paymasterAndData[SIG_EXPIRATION_DATA_OFFSET:];

        bool validationVerified = true; 

        if (expirationTime < block.timestamp) {
            validationVerified = false;
        }

        bytes32 msgHash = MessageHashUtils.toEthSignedMessageHash(
            keccak256(
                abi.encode(
                    sender,
                    block.chainid,
                    address(this),
                    token,
                    rate,
                    expirationTime
                )
            )
        );

        address recoveredSigner = ECDSA.recover(msgHash, sig);

        if (recoveredSigner != signer) validationVerified = false;

        context = abi.encode(sender, token, rate);

        return validationVerified ? (context, 0) : (bytes(""), SIG_VALIDATION_FAILED);
    }
                                            
    function _postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256 actualUserOpFeePerGas
    ) internal override virtual {
        (mode, context, actualGasCost, actualUserOpFeePerGas); // unused params
        // subclass must override this method if validatePaymasterUserOp returns a context
        /// revert("must override");
        (
            address sender,
            address token,
            uint256 rate
        ) = abi.decode(context, (address, address, uint256));
        uint256 ERC20Cost = actualGasCost * rate;
        IERC20(token).safeTransferFrom(sender, address(this), ERC20Cost);
        return;
    }

    receive() external payable {
    	this.deposit{value:msg.value}();
    }
}

