// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require('hardhat')

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  const [deployer] = await ethers.getSigners()
  console.log('deployer:' + deployer.address)

  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let ethf_token_addess; 
  let stake_address;

  if(network == 11155111) {
    ethf_token_addess = process.env.SEPOLIA_STAKE;
    stake_address = process.env.SEPOLIA_STAKE;
  } else if (network == 8453) {
    ethf_token_addess = process.env.BASE_ETHF_MAIN;
  } else {
    console.error("network error");
  }

  const stake = await ethers.getContractAt('ETHFStakeStaticPool', stake_address, deployer);

  console.log(await stake.rewardRate());
  console.log(await stake.rewardPerToken(deployer.address));
  console.log(await stake.startTime(deployer.address));
  console.log(ethers.utils.formatEther(await stake.earned(deployer.address)));

  console.log(ethers.utils.formatEther(await stake.claimed(deployer.address)));
return;    
  let getRewardTx = await stake.getReward();
  await getRewardTx.wait();
  console.log(getRewardTx.hash); 
return;
  let override = {
    value: ethers.utils.parseUnits("0.1", 18),
  }

  let stakeTx = await stake.stake(override);
  await stakeTx.wait();
  console.log(stakeTx.hash);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});

// Ethfina@2023
