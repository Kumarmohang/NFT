const Web3 = require('web3');
const fs = require('fs');
var Tx = require('@ethereumjs/tx').Transaction;
var Common = require('@ethereumjs/common').default;
var ethereumjs = require('ethereumjs-abi');
const path = require('path');

MKTPLACE_CONTRACT_ADDRESS = '0xfA068B4Fac74C9a946710dE8170ECbF72E3A0bA9';
NFT_CONTRACT_ADDRESS = '0x33b2a972a75D8aeCa36F116d5326C8600247aE5f';
TOKEN_ID = 2;
AMOUNT = 0.1;
NONCE = '0x45fd6e050152346f392001a14f4910a0a79336fd47de575f971fba422251d414';

SELLER_ADDR = '0x97a395D368d8Fb2AAD4051d958fa2F84d31dF5c6';
SELLER_PVT_KEY =
  '5b56ff71fcffdbedffd280091ed1712b3436f9083dc11870c6ec46c55b3a30fa';

async function getNonce(wallet_address, web3) {
  return web3.eth.getTransactionCount(wallet_address);
}

async function getGasPrice(web3) {
  return web3.eth.getGasPrice();
}

function isValidAddress(web3, address) {
  return web3.utils.isAddress(address);
}

async function getTransferEstimateGas(web3, contract_object) {
  return web3.eth.estimateGas(contract_object);
}

function connectionObj() {
  try {
    // return new Web3(
    //   'https://ropsten.infura.io/v3/45c67c5c20a3499380eb94ea75870233'
    // );
    return new Web3('http://127.0.0.1:7545/');
  } catch (error) {
    throw new Error(
      `${error.message}: Please check if the network config file is properly configured`
    );
    throw error;
  }
}

async function getSignedTx() {
  const web3 = connectionObj();

  var hash =
    '0x' +
    ethereumjs
      .soliditySHA3(
        ['address', 'uint256', 'uint256', 'uint256', 'address'],
        [
          NFT_CONTRACT_ADDRESS,
          TOKEN_ID,
          web3.utils.toWei(`${AMOUNT}`, 'ether'),
          NONCE,
          MKTPLACE_CONTRACT_ADDRESS,
        ]
      )
      .toString('hex');
  // var hash = web3.utils.soliditySha3(
  //   { t: 'address', v: NFT_CONTRACT_ADDRESS },
  //   { t: 'uint256', v: TOKEN_ID },
  //   { t: 'uint256', v: web3.utils.toWei(`${AMOUNT}`, 'ether') },
  //   { t: 'uint256', v: NONCE },
  //   { t: 'address', v: MKTPLACE_CONTRACT_ADDRESS }
  // );
  //   ['address', 'uint256', 'uint256', 'uint256', 'address'],
  //   [
  //     NFT_CONTRACT_ADDRESS,
  //     TOKEN_ID,
  //     web3.utils.toWei(`${AMOUNT}`, 'ether'),
  //     NONCE,
  //     MKTPLACE_CONTRACT_ADDRESS,
  //   ]
  // )
  // .toString('hex');
  console.log('hash ', hash);

  // hash = '0xd0f8d7cd8b13083369d6a2ec4593be1c028c32f9fc1e0fe6008d32d27e78a13e';
  let sign = await web3.eth.accounts.sign(hash, SELLER_PVT_KEY);
  console.log('signature ... ', sign);

  let recover = await web3.eth.accounts.recover(hash, sign.signature);
  console.log('recovered ... ', recover);

  return sign.signature;
}

async function transferNft() {
  const web3 = connectionObj();

  BUYER_ADDR = '0xFBB171bcf89F95130B33c4702c1fc50d4C0ef32D';
  BUYER_PVT_KEY =
    '3e439b0c7f88f35359dc9694e57fca0e04e746074f74149ac68280f05a979fbf';

  let gasPrice = await getGasPrice(web3);
  let gasPriceGwei = web3.utils.fromWei(gasPrice, 'gwei');

  let nonce = await getNonce(BUYER_ADDR, web3);
  // creation txn obj

  let signature = await getSignedTx();

  // marketplace abi
  const configPath = path.resolve(
    __dirname,
    '../build/contracts/MarketplaceRoyalty.json'
  );
  const config = fs.readFileSync(configPath);
  const abi = JSON.parse(config);

  //

  const contract = await new web3.eth.Contract(
    abi.abi,
    MKTPLACE_CONTRACT_ADDRESS,
    { from: BUYER_ADDR }
  );
  // new addition
  const marketplaceAddress = '0x20491765CeC27146486F16609965Fd36b011a288';

  const creatorAddress = '0x97a395D368d8Fb2AAD4051d958fa2F84d31dF5c6';

  const amountInWei = web3.utils.toWei(`${AMOUNT}`, 'ether');

  const value = web3.utils.toBN(amountInWei);

  const marketplaceShare = value
    .mul(web3.utils.toBN(`250`))
    .div(web3.utils.toBN('10000'));

  const creatorShare = value
    .mul(web3.utils.toBN(`100`))
    .div(web3.utils.toBN('10000'));

  const valueWithCommission = value
    .add(marketplaceShare)
    .add(creatorShare)
    .toString();

  console.log(
    marketplaceShare.toString(),
    creatorShare.toString(),
    valueWithCommission,
    value.toString()
  );
  const accountShares = [
    {
      account: marketplaceAddress,
      value: web3.utils.toHex(marketplaceShare),
    },
    {
      account: creatorAddress,
      value: web3.utils.toHex(creatorShare),
    },
  ];

  // const accountShares = [
  //   [marketplaceAddress, web3.utils.toHex(marketplaceShare)],
  //   [creatorAddress, web3.utils.toHex(creatorShare)],
  // ];

  let transfer = contract.methods
    .buyAsset(
      NFT_CONTRACT_ADDRESS,
      TOKEN_ID,
      `${TOKEN_ID}`,
      SELLER_ADDR,
      web3.utils.toWei(`${AMOUNT}`, 'ether'),
      NONCE,
      true,
      signature,
      accountShares
    )
    .encodeABI();

  console.log('before gas Limit.....');
  // let gasLimit = await getTransferEstimateGas(web3, {
  //   from: BUYER_ADDR,
  //   to: MKTPLACE_CONTRACT_ADDRESS,
  //   data: transfer,
  // });
  const gasLimit = 6721975;
  console.log(
    'gas Limit.....',
    await web3.eth.getChainId(),
    await web3.eth.net.getId()
  );

  let rawTransaction = {
    nonce: nonce,
    from: BUYER_ADDR,
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: MKTPLACE_CONTRACT_ADDRESS,
    data: transfer,
    chainId: '5777',
    // value: web3.utils.toHex(web3.utils.toWei('2', 'ether')),
    value: web3.utils.toHex(valueWithCommission),
  };
  const common = new Common({ chain: 'ropsten' });

  var privKey = Buffer.from(BUYER_PVT_KEY, 'hex');
  var tx = new Tx(rawTransaction);
  tx = tx.sign(privKey);

  var serializedTx = tx.serialize();
  console.log('Running.....');
  let result = await web3.eth.sendSignedTransaction(
    '0x' + serializedTx.toString('hex')
  );
  let transactionHash = result.transactionHash;
  console.log(result);
}

transferNft()
  .then(() => console.log('done'))
  .catch((err) => console.log(err));

// getSignedTx()
//   .then(() => console.log('done'))
//   .catch((err) => console.log(err));
