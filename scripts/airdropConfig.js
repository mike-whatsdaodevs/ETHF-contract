const { ethers, run } = require('hardhat')
require('dotenv').config({ path: '.env' })
const {data} = require('./wllist2.js');

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
    ethf_token = process.env.BASE_ETHF_MAIN;
    airdrop_address = process.env.BASE_AIRDROP_MAIN;
  } else {
    console.error("network error");
  }


  console.log("airdrop address :", airdrop_address);
  const airdrop = await ethers.getContractAt('ETHFAirdrop', airdrop_address, deployer);
  const token = await ethers.getContractAt('ETHF', ethf_token, deployer);


  console.log(await token.name());
  console.log(await token.decimals());
  return;


  let a = await airdrop.eachTimeClaimAmount("0xc9A697a2Ae3512B5b3fCEEa78B3D7EF3D51Fc799");
  console.log(await ethers.utils.formatEther(a.toString()));

  console.log(await airdrop.claimInfo("0xc9A697a2Ae3512B5b3fCEEa78B3D7EF3D51Fc799"));
  return;


  // let unpauseTx = await airdrop.unpause();
  // await unpauseTx.wait();
  // console.log(await airdrop.paused());
  // return;
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

let validAddrs = [
"0xD27a1bA25AAb427b6D79524c02161052bc11578e",
"0x6379e73651C0fCD10e9313Bb47f9359Cf5C207d3",
"0x52dA74c9f94BbdBeFf51ecb4ef821aE60a2fa6Cf",
"0xaED7598307651c6F36373240BFBe14F1cBfAe602",
"0xAe5F8ea3e833aF9dBBd96Efddc7aD00A4CF7Ec4e",
"0x66CFe65885680c0c5c4e36CB87C608b644B6EEbb",
"0xad685AC0722405af126C600483a8b1289470A157",
"0x231c6901f0287846Df37b39deCE167B474249ae5",
"0x9E891F0B6a8fB42a88c0e4B60701157E8B99A399",
"0xba23168Bc71c6f7B35B749631F22d99fcBbc9971",
"0xB9aA7A976DC4d8d0FAFf7B3175680dFc6E16B4b1",
"0xc9A697a2Ae3512B5b3fCEEa78B3D7EF3D51Fc799",
"0xaB49889fB60EbE90c023A9F1f54C71905e573C81",
"0x3285A0063b30A075Ce96B8881C3aCC9A03d4d0BC",
"0x9E37d895B7335de35b008d3BC938cF744a08b3bb",
"0xA5Bb84d950a9EABFdC95f4942A485d5FD6Fa5AF2",
"0x8B25CD989c3739A5fAdC3A0ADA663f9eA1164B50",
"0xCb3529Fd5C521ddcda3281ccc3CDE148cd2936d9",
"0xFAbaA9e828b0D8B949F435e429aCfeeD359272A8",
"0x707FCC6FE559B224fb7b81293B05d4803F6bC749",
"0xF328231c7A398dADa25A1258e98Aa790c35879F6",
"0x865C183d100cDe1ccF13630d7A41c30508b0Da7c",
"0xeAa92EA0E7f315a8dBfDe8CbB09D0AE146b97E75",
"0x13d7e2f8d6676f8079bF7365E528aDa2b2425A03",
"0x7f861e57778AdcB8080D01a99A069e5Bae0567C6",
"0xB3391C609883Fe99f9E5097fC54065D2684fb00F",
"0xCD178761b4537CDCf028e7feFE03B8AB3e718b9a",
"0xc8356d6AE6d4e173Bb1d9c0292f86A9fA2eb6E25",
"0xbEca776E5591Fe067aFAb081D9FD798156e7dbe1",
"0xc8605cBAa66ffc1Fa33D25B728eeFC037021e530",
"0x19cD72eFAC3149e3EE6e022aE6C6f910E73dE164",
"0xc8605cBAa66ffc1Fa33D25B728eeFC037021e530",
"0xc2D66B3DC1AF4860C4cdCc7E0e700A49Eea67F41",
"0x56177eA28e0d561f933a3E5580D69Baa67f06401",
"0x07F86bd47f9BCE0d0fd0689cDddE0e6D5924Cb6b",
"0xbb1C1cB8A06834d2d023469280dad192960256eC",
"0x4cFC4d6649F824c3CC46a16c595e619C1DB5BE75",
"0xAD3d267Dff9eaAa5028D2dc4C6A72f9Bf489738C",
"0x65497538ABA2CaF54E7dB2178c08ee2B1B31f5d1",
"0x7f2e8E41DA9bd4B3AcEEFD0611b1049f9E3f0Fc9",
"0x8f0d3122AcD04FB465A289EaBdADdedAE8f88FEf",
"0xE2604aC384D76dD1292B748800b63e7a0A13D338",
"0x6F2Ae33511CB901DAD0a5356498361523526780F",
"0x8F3FbFf5e7BFdB04c79536088613dE2Be5814CDa",
"0xfB2eA24CeFDA6E62313A3731BeBa0b05FC43D72e",
"0x7645A107369d0EdFB577FB20140B6050601C0770",
"0x6BB96f12BaB03fE877511Ab2a67c0975c1DecAEf",
"0x48aF6F969Ea8E428b50643fbE83D65353FF0cd8c",
"0xDA7C14a95D9cA86730A549799709EC80326A1122",
"0xF9Cf3468f2933e7D8676a2696BE52De630e6D970",
"0x24AD7e0bf9Fd49c356CCAEe3D357d0dD694efB2e",
"0x30D0eB339F655C89b8029312fAefAc65C91F6eF9",
"0xEd760aFb3B1845341B365748b20d73DB734Dfcb0",
"0xcF3022783c236549db51Df56e59D5b4fb2852C66",
"0x9d317340f0D8EC11f0D9258a4C2510b3Af59646E",
"0x11c3169C58A1b3040570F74700717b2167E2ECF4",
"0x357018240b03b09F84E3Efb4191c347591E49Fe2",
"0x0DCF71337b2Df680B9EC52477aFa9BE2d0dCE126",
"0x16953392A0dB1F44f1e7481036d30BC5dD6872D3",
"0x1B313CCcA2533FAF76e7A40071BB6C60A850cA9D",
"0x12CE5603EdeF781953839E72505A1b9A6aa9b648",
"0x9dB3CeC3829d3F40AA84B8555633E20df3CE1360",
"0xF1f4c8c1FaF0Dea0474B004597604624CC9fb327",
"0x787594d4E352E99570ba25f391Eab77A41Ce5c6e",
"0x9fCC647DD1Ca68e34E1bBA3c9158906B8252Ee4B",
"0xbDf7fe8F9a81cD5Ce851b3559d6ff83CA8988dc1",
"0xBF2272c5B7b02FF40aA16d8237788d53B2E2cf9f",
"0x9C4AA2a41de5D3C7F0c02145945bD8997c262e96",
"0x8424C0D72E3a2f32A65EEab89cA6910d33352847",
"0xC2C0d92598893Cf337d401caaC94B29438103B49",
"0x5df245be81d996150F8EfEA87817df6c2D16F6A1",
"0x367B0368a34cc78a246AB84CDbcC4F69492e85B2",
"0xB3391C609883Fe99f9E5097fC54065D2684fb00F",
"0xB706620eEd3765A838DC3fE3Aa1f0E99B9d3d5Af",
"0x323F72C78eac990F2bE3061aCd4B7613443EE87c",
"0xaDc6AE2644d6e04d84eF880344c5B7913cE89fD5",
"0x4cCA90d8E67a443a65cD5F29243C0B282590FFdB",
"0x215902d7062A94344Ea3C1C5e2Df16f9f734e1dc",
"0xBd4BC0E22bEFbFe34789328B4e30FB0aF018aa80",
"0xc4997064D99aE6dD6Fa1f55678f4BA9173ACD1e7",
"0x5dca2e306eb0f723A10F9BC017DAc5A00130f733",
"0xa4cceF9296492fa6cCF05d02B7BC235bA9bf4896",
"0xBe183A9E4543b3d8B2Ac73bdcdbC48CF4fbfE7d4",
"0xd73433c49e43ec7d2af19DaF28519754E79e6d0D",
"0xAc680FADC9Cc7C7e45cFd1B941E1fc68e95aCe66",
"0x4ed027FD0F4d57B3a163A3CB3a38465213e216bc",
"0xA582919A832EC529c99B930A420aE4058d70E4f0",
"0xB47E04c3A24E37bBc885Ef0d9D76D02BD2873b7d",
"0x5c9662A73DE952bb4056C80c11c4D8a14b25E3B1",
"0xB63035838cc5DA579e81eB2b31F474AB5f9D7960",
"0xEFb7c7f52e8D72bC3dCb88B74424a83a241D9b2d",
"0x9674c976F9D7e7c2dF7594C20A5Cd71F39ac02cA",
"0x178F78bBC45643aefd3628e82b5CA85ebcFE0261",
"0x82edD42aB7C2aeA1DC520aC2a3Ac88dCd1Bd456c",
"0xfE5Fbe8f2f18f65dd531153d16BE919776c63c82",
"0x4243BDA054F36F44bea9C6BF9F7851D76a88C47f",
"0xb61107206E92d655DD7653dFCA71f8864bCF3aBE",
"0x3e696B1A8f4c581Ed50694ab9676e6102B6Def7A",
"0x99dde4c830c0d9815d4Bf7B8c2937e66715b8bF9",
"0x185Af04124b11412888190cCaf866FA9D67d422d",
"0x1C189334570868780ce1b5E18eB48CB1579a3088",
"0xd70BC1748E94AEc2f0Dac1Eeb95149a2BE31AaBC",
"0x40f43C451380816A388CEEdbe4A609B0D46F5b12",
"0xB76E7B2665525687cB5389E38d2C284416570526",
"0xC0b6eA766036B31a26383c5e5d4822998fA1b704",
"0x75d97774fb940F6a2E3561512eB2Ea9c4b76671D",
"0x4e30F6bcbe2f301464FC56F15fB8dE1a726244aD",
"0x4C256980FaC83D01DEF92F249b5b6F66239192aB",
"0xafAa8C7C3FF468BbFDD7F0B6ff1060BE9f79e1fC",
"0x32Ca4D32078768Ec47D7A9223F7F2A738C905cFA",
"0x3fF8628Ef473f1008392DC96E4AD1bc41c3A7f8e",
"0x744C56FfC85C95929988F100B5a54e21C53511eC",
"0x496e057948F8050B2c08065a73A857a699648D16",
"0x72d713Fea459376c21e91a3AE4E4AC005Dbb8c08",
"0x2A93A158522679Bf57b35961A06147c398e25745",
"0x274D9BAf071FEd58323C7c52E1E0d542a213756b",
"0x388d91aC3805d12e1c204a9E956fcd95c5cb91F3",
"0x8e94dDdd26f4A4F3cF330019fdaDC0Cef0F1Ef51",
"0xcdD2FE0AC406ce687DcCB85e53188a8C8f1Ae93E",
"0xcab2f15acA380ba4aC4Adfbca6De3072877066b0",
"0x1A63f4F6a130f294440A130c8FF77f693224b39f",
"0xFA3C656A09f93a7Ff9BaB960e70628b76A2eBFC3",
"0x7EA96c3261E742BD9Dd05070205B92ed55A4e500",
"0x68D199fFFE5847569849148a4b7fCB046FDCd0AC",
"0x9a99419A5d4bf5f1E23B2B295b7cf36a9194c7A2",
"0xAC50AaaC5c91032dB3F1cC0D880b811c3CC14a1b",
"0x2751bE071716a455F81FA43796048Cb421a79Ac4",
"0x1f8A2087d5F9434084Cc56E7Bab79D88e3882DA6",
"0x0F1e6781d5bC8615ecbA4ea31247F26e96DC4DEe",
"0xb750804cf313CeF42a171E0b1A91B8Fe0E3B4b3B",
"0x648e19C7B51d6cAcb0f75131abfB61ccfB3c93f8",
"0x68f633E4614E658496c1394cd814aCF9bE311C16",
"0xB69137459378b45F7c00C0EC8CD6e03C140a3204",
"0x8fE22EDa181dbE557f88b4276eC5e4Ac34dB64f6",
"0x0119a03F397d73613D1AFA773f7688142E11dF18",
];
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
      if(!validAddrs.includes(chunk[j][0])) {
          console.log("not valid :", chunk[j][0]);
          continue;
      }
      account = chunk[j][0];
      accounts.push(chunk[j][0]);
    
      totalAmount += chunk[j][1];
      amounts.push(chunk[j][1]);

      totalCount += 1;
  
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
