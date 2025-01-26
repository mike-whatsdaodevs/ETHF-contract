let data = [
["0xB19C35bB849fB35f49c52503Dcd469C6D15Eafc6",7],
["0x90ca8ab9481B0F021f949ceE6Da96b2d5a57c1a2",16],
["0xbc415BDedCABD2eb55179fcb8b2Ea6819b6bAE36",24],
["0xeC005665fb949abf05C3fD76D03F39160d532f3F",26],
["0x597FC10759f2a9a7607680fE234b931c3b2c2266",284],
["0x510Aed75c05Ec203b42411Ea2860650290DBe24A",31],
["0xD2EFbD13a843C4caa69269Fa7F2119a0697939a3",35],
["0x34b34e5BB494606eb39cF77F4a256198D31118b3",90],
["0x81D5D1d43bC0B54857c163d4DD9Dd2F25CF61a0B",30],
["0x5E7F64b4E46BD74c995a0e3D8EBadbF3dA48D12e",54],
["0x7DBBC13754755A544855F1B3f37252dd413A2419",12],
["0x43479a57Ff1949BC0149B1E1A57017eD442C3c67",15],
["0xf0b99F4334665Abd7c2FF5Eec99476E8EDd49bcd",13],
["0x1067e3B2F17C169f6d6302F72958aa9A02670905",62],
["0x688E19Ec63959D0cd2ECfa4E267D2090e0395Ee1",7],
["0xe7b7AD6e7E271b11a1B059ac76E1463EaA140c1E",5],
["0xDbd898AC08cA6Af771DCfD1BFAd7396845a76b13",7],
["0x1c67318c1c5240be6a4dCC34b95f2d64249547BE",4],
["0x16E46ef3B30F81E7244F998302E06Abf3239428a",10],
["0xA02a00762e7089Ad3efE52Aeda2e38A34b8BDc4C",5],
["0x26F21Bd2cC12Cc1CB908c4626d58B72844E12c98",2],
["0xdf761DbF7901d3Cdc2Fd32681966CEBcc6c19cEC",3],
["0x60538e9DA2feeC6BAE2e052Bc3dE531FbBF385Ac",18],
["0xE445806AF6F65dD22d2eee449Df05934802AD358",2],
["0x026205C9b996569C9f8621fc9232e5A866be3188",12],
["0x371d089b45EE0Dd3580f31a9F2185211863bF387",1],
["0x816153F43335787d35a9Dc8e682a9f91079f4Df0",19],
["0x3c1DF58cc21584487559BBE7f452aaDcb4C41410",1],
["0xDcc8cA5B78969cC06f00bf91B31E9a8601aAEE8b",6],
["0xAD5b3Be8342e6C27cE711bd3F0f69acBB988a8dd",8],
["0xD23793c98c9334b8Ec0D85e53278536D8415dAF1",24],
["0x40754e6920F16501Ff56Ac89DC2B3223F2F3b608",4],
["0x7056d88375c48d0C02f48ccf7023dE1642819aA4",6],
["0xf6627096556A1401e9B53115b1e6A11f007b9734",7],
["0xf40cc78Bdf8dF9f3D85c1027Da10Da1275AC5272",5],
["0x4C4ea35011E371e3FBdd63a333995EaB7AeC137C",14],
["0x3B85AdAf207bA17405B69d0104334697Be7f4852",7],
["0xeD38bd4CEAC1dd960318186Ed88cc19305f8b2a7",23],
["0xE73DE2D663d7449a015f7e394FADC26781C0bc17",5],
["0x08C6e3abb9F06BF3664D30f5F809e7836F8b926c",45],
["0x82ED5fA0d3069025244c87E3c37254b8494fe871",45],
["0x89d8903E7249594B657f205A120843Ea90B19a44",9],
["0xe7A2b17fC1E652e485E448fE977DA46bde93A39f",9],
["0x46DDFE635fDc50dacC723925FF14529037Ebd83f",9],
["0xb69ffB34B9Fd368C4A323bee677f2e1a8b059fFD",4],
["0x176fDE2c9138b13Cbfe7a319E2C90b583e2f8d23",27],
["0x3edCd312771C1499CD16bF0Eb02798B545ccafdC",117],
["0xd2457d496C612e6155fBaCFa90483Ea3f1e700F8",68],
["0x7e9Fa3589c286fC4412DE60D4C4e66df41bB28e1",68],
["0xD63275c40e494E8E1565AeC84c86B9AcEA5F36be",155],
["0xFDC247A2365b7D0052e296A8b23fe26dE3Fe8dEd",68],
["0x897cFAB8587428c7450B8A2AA707FcB46E58bcFd",39],
["0xf4699679CF166A7f195B485A1d4138e2DE52f14D",67],
["0x87E047d9984B63C6a5A545Bd0f83140d8AeED5aA",67],
["0xEE922b5Ba629d0d8e8e4c77339Dd0F4e5D97D876",10],
["0x6AFB4E3b73898289eCc411D662d10bA4d2944B84",340],
["0x59B6c91E077F261BC0D7539F7232394B00D69b95",21],
["0x9BC312c77c3e1c1bad444940386eA631C9c13E35",18],
["0x0970c0C2C8139B395eAd0531F9f7638180D6754c",29],
["0x98c89954F2DA1914480B6e9Be73Dc67b43E3dA3b",3],
["0xccD4A880fA62C76671D1CEAb762a5A4bB13E24D5",8],
["0xA11FBb2c26CB2962C74F1F80EE1bd320025a793a",16],
["0x0cd3A47eDE0bDd7368553674D517dAA3b6aE936B",2],
["0x675CD852F5d894D05A31103fC6f28144F64af0E0",15],
["0x537BA74e28c13777B05F798E9d4F68280Ba513F5",62],
["0xAF702571cb3F0b9091C6E6c8B9731705E2ee0804",1],
];


exports.data = data;