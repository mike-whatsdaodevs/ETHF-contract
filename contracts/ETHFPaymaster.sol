// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@account-abstraction/contracts/core/BasePaymaster.sol";

contract ETHFPaymaster is BasePaymaster {
   	
   	constructor(IEntryPoint _entryPoint) BasePaymaster(_entryPoint) {

   	}

   	function _validatePaymasterUserOp(
        PackedUserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) internal virtual override returns (bytes memory context, uint256 validationData) {
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
        return;
    }

    receive() external payable {
    	this.deposit{value:msg.value}();
    }
}

