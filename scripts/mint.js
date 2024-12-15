const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider
  let signer = provider.getSigner()

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  console.log('deployer:' + deployer.address)


  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);


  let ethf_address = process.env.ETHF;
  console.log("ethf_address :", ethf_address);
  const ethf = await ethers.getContractAt('ETHF', ethf_address, signer);

  let amount = ethers.utils.parseUnits("10000000000", 18);

  console.log("amount :", amount);
  console.log("deployer.address ", deployer.address);

  let tx = await ethf.mint(deployer.address, amount);
  await tx.wait();
  console.log(tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
