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


  let paymaster_address = process.env.PAYMASTER;

  console.log("paymaster_address :", paymaster_address);
  const paymaster = await ethers.getContractAt('ETHFPaymaster', paymaster_address, signer);

  let amount = ethers.utils.parseUnits("1", 18);

  console.log("amount :", amount);

  let tx = await paymaster.deposit({value: amount});
  await tx.wait();
  console.log(tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
