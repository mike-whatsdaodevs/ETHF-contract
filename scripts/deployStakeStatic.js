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

  if(network == 11155111) {
    ethf_token = process.env.SEPOLIA_ETHF
  } else if (network == 8453) {
    ethf_token = process.env.BASE_ETHF_MAIN
  } else {
    console.error("network error");
  }

  console.log(ethf_token);

  const ETHFStakeStaticPool = await hre.ethers.getContractFactory('ETHFStakeStaticPool')
  const stake = await ETHFStakeStaticPool.deploy(ethf_token, deployer.address)
  await stake.deployed()
  console.log('stake deployed to:', stake.address);

  const initialize_data = await stake.populateTransaction.initialize(deployer.address);
  console.log("initialize_data data is",initialize_data)

  const ETHFProxy = await hre.ethers.getContractFactory('ETHFProxy')
  let proxy = await ETHFProxy.deploy(stake.address, initialize_data.data);
  await proxy.deployed()
  console.log("proxy address is", proxy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});

// Ethfina@2023
