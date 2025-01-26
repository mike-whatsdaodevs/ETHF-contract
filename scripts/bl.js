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
    ethf_token = process.env.BASE_ETHF_MAIN;
    airdrop_address = process.env.BASE_AIRDROP_MAIN;
  } else {
    console.error("network error");
  }

  const airdrop = await ethers.getContractAt('ETHFAirdrop', airdrop_address, deployer);
  const ethf = await ethers.getContractAt('ETHF', ethf_token, deployer);

  console.log(await ethf.BL("0x0C7840f3C15fCfF0E00c6AECdc2dC01D2f7BB7aC"));
  return;

  let wlTx = await ethf.batchRemoveBL(["0x0C7840f3C15fCfF0E00c6AECdc2dC01D2f7BB7aC"]);
  await wlTx.wait();
  console.log(wlTx.hash);return;

  let blTx = await ethf.batchAddBL([
    // "0x43227AcA630FB45b67de727f8f78986e8EbcF854", 
    // "0xDE52B20be233520eCEed039B4b21Ad4Cf35EE983", 
    // "0x6828768929253A161abed848c90AC458D1Def97E",
    // "0x1157a60F7019692163505c115f98FA527Fd3E9BF",
    // "0x1157a60F7019692163505c115f98FA527Fd3E9BF",
    // "0xd06411c84747A264E63F383c9BC73713eE9007BB",
    // "0xCaD723F5850610bE56591c63203FEB210bb02F78",
    // "0x0C7840f3C15fCfF0E00c6AECdc2dC01D2f7BB7aC",
    // "0xAf5a19b8Ef4Eb25a52431dEe26F105F1aB030e5c",
    // "0x8487F3BB028b340C06eBF5Aa10f3fBD7dAEecBa8"
    // "0xa5E47C92B26A02de5936FA3cE38cBB21F65f7AB6",
    // "0x4bd4FD0dCb7dd57A6c6d649596037b1E5bA60364",
    // "0x3e696B1A8f4c581Ed50694ab9676e6102B6Def7A",
    // "0xBEdA45CC6D095Dea2059012163Cc46228158b084",
    // "0x60aa74DD2B7B83F418C3bDbF636D43dF8B34809F",
    // "0x25bec591eab34e44920cD2C82C9B3BD08E7E94bD",
    // "0xaACeDbf79B983B3C5D85A1D6d01f3E1E08719e28",
    // "0x7AfA9D836d2fCCf172b66622625e56404E465dBD",
    // "0x5fE77d64a02Eb92DE0dC8A5228CA97eb4EcA4787",
    // "0x98E8f02a408D33398c82cdCd618C7b833546A6C9",
    // "0x979699002cbde6083436a18177E38E957f8C9c03",
    // "0xA89c9332259a300255697e1936956aBCECe70453",
    // "0x10D417415aAccC93E6eba6dCE8b9286536e12b08",
    // "0xD5eDeE0B441C2bf1d539250CA6F26016c1B3b3cc",
    // "0x73D0A34d3F3850256C2b8C1E3f62e174632F6c2f",
    // "0x25bec591eab34e44920cD2C82C9B3BD08E7E94bD",
  ]);
  await blTx.wait();
  console.log(blTx.hash);

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
