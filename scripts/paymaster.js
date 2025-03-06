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


  let paymaster_address = "0xB6c1fd87a90FBdd92517Bf41C66531D0d42Fc241"; ///process.env.PAYMASTER;

  console.log("paymaster_address :", paymaster_address);
  const paymaster = await ethers.getContractAt('ETHFPaymaster', paymaster_address, deployer);


  let revertData =
    "0xfb8f41b2000000000000000000000000b6c1fd87a90fbdd92517bf41c66531d0d42fc241000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bab2b5a073c970";
  let revertD = paymaster.interface.parseError(revertData);
  console.log(revertD);return;

  let setPaymasterSignerTx = await paymaster.setPaymasterSigner(process.env.PAYMASTER_SIGNER);
  await setPaymasterSignerTx.wait();

  console.log(await paymaster.signer());
  return;;

  let withdrawStakeTx =await paymaster.withdrawStake(deployer.address);
  await withdrawStakeTx.wait(); 

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
