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
  console.error(network);
  let ethf_token; 
  let stake_address;

  if(network == 11155111) {
    ethf_token = process.env.SEPOLIA_ETHF;
    stake_address = process.env.SEPOLIA_STAKE;
  } else if (network == 8453) {
    ethf_token = process.env.BASE_ETHF_MAIN
    stake_address = process.env.BASE_ETHF_STAKE;
  } else {
    console.error("network error");
  }

  console.log(ethf_token);

  const ETHFStakeStaticPool = await hre.ethers.getContractFactory('ETHFStakeStaticPool')
  const stake = await ETHFStakeStaticPool.deploy(ethf_token, deployer.address)
  await stake.deployed()
  console.log('stake deployed to:', stake.address);

  let implement_address = stake.address;

  const proxy = await ethers.getContractAt('ETHFStakeStaticPool', stake_address, deployer);

  let upgradeToTx = await proxy.upgradeToAndCall(implement_address, "0x");
  await upgradeToTx.wait();
  console.log(upgradeToTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});

// Ethfina@2023
