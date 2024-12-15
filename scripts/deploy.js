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


  const ETHF = await hre.ethers.getContractFactory('ETHF')
  const ethf = await ETHF.deploy()
  await ethf.deployed()
  console.log('ethf deployed to:', ethf.address);

  const initialize_data = await ethf.populateTransaction.initialize();
  console.log("initialize_data data is",initialize_data)

  const ETHFProxy = await hre.ethers.getContractFactory('ETHFProxy')
  let proxy = await ETHFProxy.deploy(ethf.address, initialize_data.data);
  await proxy.deployed()
  console.log("proxy address is", proxy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
