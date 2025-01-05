const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })
const {data} = require('./wllist.js');

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


  console.log("airdrop address :", airdrop_address);
  const airdrop = await ethers.getContractAt('ETHFAirdrop', airdrop_address, deployer);
  return;

  // let resetWhiteListAmountsTx = await airdrop.resetWhiteListAmounts(["0xAF702571cb3F0b9091C6E6c8B9731705E2ee0804"]);
  // await resetWhiteListAmountsTx.wait();

  // let whAmount = 1;
  // let setTx = await airdrop.addWhiteListAmounts(
  //   ["0xAF702571cb3F0b9091C6E6c8B9731705E2ee0804"], 
  //   [ whAmount ]
  // );
  // await setTx.wait();
  // console.log(setTx.hash);
  // return;

  let chunks = splitArray(data, 1000);

  let len = chunks.length;
  let chunk;
  let account;
  let totalAmount = 0;
  let totalCount = 0;
  for(let i = 0; i < len; i ++) {
    chunk = chunks[i];
    let chunkLen = chunk.length;
    let accounts = new Array();
    let amounts = new Array();
    for(let j = 0; j < chunkLen; j ++) {
      amounts[j] = chunk[j][0];

      totalAmount += chunk[j][0];
      totalCount += 1;
      accounts[j] = chunk[j][1];
      account = chunk[j][1];
      if (!ethers.utils.isAddress(account)) {
        console.log("i is", i);
        console.log("error address is", account);return;
      }
    }
    console.log(accounts);
    console.log(amounts);
    let tx = await airdrop.addWhiteListAmounts(accounts, amounts);
    await tx.wait();
    console.log(tx.hash);
    console.log("i :", i);
    console.log("account :", account);
  }
  console.log(" totalAmount :", totalAmount);
  console.log(" totalCount :", totalCount);
}

function splitArray(array, size) {
  let data = [];
  for (let i = 0; i < array.length; i += size) {
    data.push(array.slice(i, i + size))
  }
  return data
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
