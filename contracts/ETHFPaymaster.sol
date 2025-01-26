// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@account-abstraction/contracts/core/BasePaymaster.sol";

contract ETHFPaymaster is BasePaymaster {

    using SafeERC20 for IERC20;

    uint256 public constant SIG_VALIDATION_FAILED = 1;
    uint256 internal constant TOKEN_DATA_OFFSET = PAYMASTER_DATA_OFFSET + 20;
    uint256 internal constant PRICE_DATA_OFFSET = TOKEN_DATA_OFFSET + 32;

    mapping(address => bool) public allowedToken;
   	
   	constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {

   	}

   	function _validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) internal virtual override returns (bytes memory context, uint256 validationData) {
        address sender = userOp.sender;
        address token = address(bytes20(userOp.paymasterAndData[PAYMASTER_DATA_OFFSET: TOKEN_DATA_OFFSET]));
        uint256 price = uint256(bytes32(userOp.paymasterAndData[TOKEN_DATA_OFFSET: PRICE_DATA_OFFSET]));

        bool txValidate = true; ///= _isWhitelistedBundler();

        context = abi.encode(sender, token, price);

        return txValidate ? (context, 0) : (bytes(""), SIG_VALIDATION_FAILED);
   		return (new bytes(0), 0);
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
            uint256 price
        ) = abi.decode(context, (address, address, uint256));
        uint256 ERC20Cost = ((actualGasCost) * price) / 1e18;
        IERC20(token).safeTransferFrom(sender, address(this), ERC20Cost);
        return;
    }

    receive() external payable {
    	this.deposit{value:msg.value}();
    }
}

