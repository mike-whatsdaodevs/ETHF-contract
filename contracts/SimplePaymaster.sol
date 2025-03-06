// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@account-abstraction/contracts/core/BasePaymaster.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

contract SimplePaymaster is BasePaymaster {

    using SafeERC20 for IERC20;

    uint256 public constant SIG_VALIDATION_FAILED = 1;
    uint256 internal constant TOKEN_DATA_OFFSET = PAYMASTER_DATA_OFFSET + 20;
    uint256 internal constant RATE_DATA_OFFSET = TOKEN_DATA_OFFSET + 32;
    uint256 internal constant SIG_EXPIRATION_DATA_OFFSET = RATE_DATA_OFFSET + 32;

    mapping(address => bool) public allowedToken;

   	constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {
   	}

   	function _validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) internal virtual override returns (bytes memory context, uint256 validationData) {
        return (bytes(""), 0);
    }
                                            
    function _postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost,
        uint256 actualUserOpFeePerGas
    ) internal override virtual {
        (mode, context, actualGasCost, actualUserOpFeePerGas); // unused params
        return;
    }

    receive() external payable {
    	this.deposit{value:msg.value}();
    }
}

