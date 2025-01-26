const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })

async function main() {
  await run('compile')

  let provider = ethers.provider
  let signer = provider.getSigner()

  console.log('NetWorks ID is ', (await ethers.provider.getNetwork()).chainId)
  console.log('NetWorks Name is ', (await ethers.provider.getNetwork()).name)

  const [deployer] = await ethers.getSigners()

  let my_address = deployer.address;
  console.log('my_address:' + my_address)



  const network = (await ethers.provider.getNetwork()).chainId;
  console.log(network);

  let ethf_token; 
  let airdrop_address;

  if(network == 11155111) {
    ethf_token = process.env.SEPOLIA_ETHF;
    airdrop_address = process.env.SEPOLIA_AIRDROP;
  } else if (network == 8453) {
    ethf_token = process.env.BASE_ETHF;
    airdrop_address = process.env.BASE_AIRDROP_MAIN;
  } else {
    console.error("network error");
  }

  const airdrop = await ethers.getContractAt('ETHFAirdrop', airdrop_address, deployer);

  console.log("airdrop.address: ", airdrop.address);


  let takeBackTokenTx = await airdrop.takeBackToken();
  await takeBackTokenTx.wait();

  console.log(takeBackTokenTx.hash);
  return;
  // let amount = ethers.utils.parseUnits("20 000 000", 18);

  // let manageTotalAmountTx = await airdrop.manageTotalAmount(amount);
  // await manageTotalAmountTx.wait();

  // console.log(ethers.utils.formatEther(await airdrop.totalAmount()));
  // return;
  

  // let claimTx = await airdrop.pause();
  // await claimTx.wait();
  // console.log(claimTx.hash);

  // my_address = "0x90ca8ab9481B0F021f949ceE6Da96b2d5a57c1a2";

  console.log("eligile is: ", await airdrop.WhiteListAmounts(my_address));

  console.log("total Vested Token is: ", await airdrop.totalVestedToken());

  let info = await airdrop.claimInfo(my_address);
  console.log("info is:", info );
  console.log("availableToClaim Token is: ", ethers.utils.formatEther(await airdrop.availableToClaim(my_address)));
  console.log("eachTimeClaimAmount Token is: ", ethers.utils.formatEther(await airdrop.eachTimeClaimAmount(my_address)));

 
  // let claimTx = await airdrop.claim();
  // await claimTx.wait();
  // console.log(claimTx.hash);
  // return;



}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
