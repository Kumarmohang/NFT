const Web3 = require('web3');
const path = require('path');
const dotenv = require('dotenv');
const { randomBytes } = require('crypto');
const axios = require('axios');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const { abi: DecentralandAbi } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../src/ABI/LANDProxyTest.json'))
);
const { abi: ERC721Abi } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../src/ABI/ERC721.json'))
);

const { abi: marketplaceABI } = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, '../../src/ABI/MarketplaceRoyalty.json')
  )
);

async function getNonce(walletAddress, web3) {
  return web3.eth.getTransactionCount(walletAddress);
}

async function getGasPrice(web3) {
  return web3.eth.getGasPrice();
}

function getNetworkDetails() {
  const network = {};
  network.network_id = process.env.NETWORK_ID;
  network.type = process.env.NETWORK_TYPE;
  network.name = process.env.ETHEREUM_NETWORK;
  return network;
}

function getTokenId() {
  const hexString = `0x${randomBytes(32).toString('hex')}`;
  return Web3.utils.hexToNumberString(hexString);
}

// const network = process.env.ETHEREUM_NETWORK;
// const web3 = new Web3(
//   new Web3.providers.HttpProvider(
//     `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
//   )
// );
// // console.log(abi);
// console.log(process.env.SIGNER_PRIVATE_KEY);
// // Creating a signing account from a private key
// const signer = web3.eth.accounts.privateKeyToAccount(
//   process.env.SIGNER_PRIVATE_KEY
// );
// web3.eth.accounts.wallet.add(signer);
// // Creating a Contract instance
// const contract = new web3.eth.Contract(
//   abi,
//   // Replace this with the address of your deployed contract
//   process.env.DEMO_CONTRACT,
//   { from: signer.address }
// );
// const nonce = getNonce(signer.address, web3);

async function getConnectionObj(abi, smartContractAddress = '') {
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );
  web3.eth.accounts.wallet.add(signer);
  // Creating a Contract instance
  let contract;
  if (smartContractAddress) {
    contract = new web3.eth.Contract(
      abi,
      // Replace this with the address of your deployed contract
      smartContractAddress,
      { from: signer.address }
    );
  } else {
    contract = new web3.eth.Contract(
      abi,
      // Replace this with the address of your deployed contract
      process.env.DEMO_CONTRACT,
      { from: signer.address }
    );
  }

  return {
    web3,
    contract,
    signer,
    network,
  };
}

export function getValueWithCommission(
  web3,
  amount,
  marketplaceFees,
  marketplaceFeesRecipient,
  creatorRoyalty,
  creatorAddress
) {
  const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

  const value = web3.utils.toBN(amountInWei);
  let valueWithCommission = value;
  const accountShares = [];

  if (marketplaceFees && marketplaceFees !== 0) {
    const marketplaceShare = value
      .mul(web3.utils.toBN(`${marketplaceFees}`))
      .div(web3.utils.toBN('10000'));

    valueWithCommission = valueWithCommission.add(marketplaceShare);
    accountShares.push({
      account: marketplaceFeesRecipient,
      value: web3.utils.toHex(marketplaceShare),
    });
  }

  if (creatorRoyalty && creatorRoyalty !== 0) {
    const creatorShare = value
      .mul(web3.utils.toBN(`${creatorRoyalty}`))
      .div(web3.utils.toBN('10000'));

    valueWithCommission = valueWithCommission.add(creatorShare);

    accountShares.push({
      account: creatorAddress,
      value: web3.utils.toHex(creatorShare),
    });
  }

  valueWithCommission = valueWithCommission.toString();
  return { amountInWei, accountShares, valueWithCommission };
}

async function getBuyTxData(
  tokenId,
  nftType,
  creatorRoyalty,
  creatorAddress,
  sellerAddress,
  signature,
  nonce,
  marketplaceFees,
  marketplaceFeesRecipient,
  amount
) {
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
    )
  );
  const contract = new web3.eth.Contract(
    marketplaceABI,
    process.env.MARKETPLACE_SMART_CONTRACT
  );

  const { amountInWei, accountShares } = getValueWithCommission(
    web3,
    amount,
    marketplaceFees,
    marketplaceFeesRecipient,
    creatorRoyalty,
    creatorAddress
  );
  const transfer = contract.methods
    .buyAsset(
      process.env.NFT_SMART_CONTRACT,
      tokenId,
      tokenId,
      sellerAddress,
      amountInWei,
      nonce,
      nftType,
      signature,
      accountShares
    )
    .encodeABI();
  return transfer;
}

async function Owner(tokenId) {
  const { web3, contract, signer } = getConnectionObj(ERC721Abi);
  const tx = contract.methods.ownerOf(tokenId);

  // Sending signed transasction
  const gasLimit = await tx.estimateGas({ gas: 5000000 });

  const receipt = await tx.call({
    nonce: await getNonce(signer.address, web3),
    from: signer.address,
    gas: gasLimit,
    gasLimit: 5000000,
  });
  // The transaction is now on chain!
  console.log(`Mined in block`);
  console.log({ receipt });

  return receipt;
}

async function Mint(tokenUri) {
  try {
    const { web3, contract, signer, network } = await getConnectionObj(
      ERC721Abi
    );

    const tx = await contract.methods.mintNft(signer.address, tokenUri);

    const gasPrice = await tx.estimateGas({ gas: 5000000 });
    console.log(gasPrice);
    const receipt = await tx
      .send({
        nonce: await getNonce(signer.address, web3),
        from: signer.address,
        gas: gasPrice,
        gasLimit: 5000000,
      })
      .once('transactionHash', (txhash) => {
        console.log(`Mining transaction ...`);
        console.log(`https://${network}.etherscan.io/tx/${txhash}`);
      });
    // The transaction is now on chain!
    console.log(`Mined in block`);
    console.log(receipt.transactionHash);
    console.log(receipt.events.Transfer.returnValues.tokenId);

    return {
      transactionHash: receipt.transactionHash,
      tokenId: receipt.events.Transfer.returnValues.tokenId,
    };
  } catch (error) {
    throw error;
  }
}

async function Transfer(tokenId) {
  const { contract, signer, network } = await getConnectionObj(ERC721Abi);
  const tx = contract.methods.transferFrom(
    signer.address,
    '0xcDC58022138D1FF4441E28e3c1a86b8d997711E4',
    tokenId
  );

  const gasPrice = await tx.estimateGas({ gas: 5000000 });

  console.log(gasPrice);
  const receipt = await tx
    .send({
      from: signer.address,
      gas: gasPrice,
      gasLimit: 5000000,
    })
    .once('transactionHash', (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block`);
  console.log(receipt.transactionHash);
  console.log(receipt.events.Transfer.returnValues);

  return { transactionHash: receipt.transactionHash };
}

async function getTxnHashStatus(txnHash) {
  try {
    const { web3 } = await getConnectionObj(ERC721Abi);
    const txnReceipt = await web3.eth.getTransactionReceipt(txnHash);
    if (txnReceipt) {
      console.log({ txnReceipt });
      if (txnReceipt.status) {
        return 'SUCCESS';
      }
      return 'FAILURE';
    }
    return 'PENDING';
  } catch (error) {
    throw error;
  }
}

async function checkApprovalForAll(smartContractAddress, owner, operator) {
  try {
    const { contract } = await getConnectionObj(
      ERC721Abi,
      smartContractAddress
    );
    return contract.methods.isApprovedForAll(owner, operator).call();
  } catch (error) {
    throw error;
  }
}

async function getLandDetails(owner, smartContractAddress) {
  try {
    // 0x3D1c398BaeD156BB089C9756696CEf1FB0De8a3b testnet
    // 0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d mainnet
    const { contract } = await getConnectionObj(
      DecentralandAbi,
      smartContractAddress
    );
    const tx = await contract.methods.tokensOf(owner);
    // console.log(signer.address);
    const tokenResult = await tx.call();
    if (tokenResult) {
      const tokenMetadata = [];
      // tokenMetadata = [];
      for (let i = 0; i < tokenResult.length; i++) {
        const nftResult = await axios
          .get(
            `https://api.decentraland.org/v2/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/${tokenResult[i]}`
          )
          .then((res) => {
            const meta = res.data;
            return {
              meta,
              ownerAddress: owner,
              smartContractAddress,
            };
          })
          .catch((error) => {
            console.error(error);
          });
        tokenMetadata.push(nftResult);
      }
      // console.log(tokenMetadata);
      return tokenMetadata;
    }
    return false;
  } catch (error) {
    console.log('Error Occurred| Tranasction Reverted');
    throw error;
  }
}

async function getExternalNfts(userPublicAddress, assetSmartContractAddress) {
  const { contract } = await getConnectionObj(
    ERC721Abi,
    assetSmartContractAddress
    // '0xe5a4b900c7d3cEAae41D4d33014d27E93a2DA017'
  );
  const tokenMetadata = [];
  const metadata = {};
  const totalTokens = await contract.methods
    .balanceOf(userPublicAddress)
    .call();
  // '0x2b1cfe8d8df70b711649f728de5d5af6a921fab5'
  for (let i = 0; i < totalTokens; i++) {
    const tokenId = await contract.methods
      .tokenOfOwnerByIndex(userPublicAddress, i)
      .call();
    let uri = await contract.methods.tokenURI(tokenId).call();
    if (!uri.includes('http')) {
      uri = `https://ipfs.io/ipfs/${uri.split('ipfs://')[1]}`;
    }
    const nftResult = await axios
      .get(uri)
      .then((res) => res.data)
      .catch((error) => {
        console.error('error', error);
      });
    if (!nftResult.image.includes('http')) {
      nftResult.image = `https://ipfs.io/ipfs/${
        nftResult.image.split('ipfs://')[1]
      }`;
    }
    nftResult.id = tokenId;
    metadata.meta = nftResult;
    metadata.ownerAddress = userPublicAddress; // '0x2b1cfe8d8df70b711649f728de5d5af6a921fab5';
    metadata.smartContractAddress = assetSmartContractAddress;
    // '0xe5a4b900c7d3cEAae41D4d33014d27E93a2DA017';
    tokenMetadata.push(metadata);
  }
  return tokenMetadata;
}

// getLandDetails('0xf16a25a1b4e6434bacf9d037d69d675dcf852699');
// getLandDetails('0xA9b81Ba4978FaC64B52FEBe0e9E1FCeCE8d6F33B');

// console.log(abi);
// console.log(path.resolve(__dirname, '../../.env'));
// getConnectionObj().then();

module.exports = {
  getGasPrice,
  getNonce,
  Owner,
  Mint,
  Transfer,
  getNetworkDetails,
  getTxnHashStatus,
  checkApprovalForAll,
  getTokenId,
  getLandDetails,
  getBuyTxData,
  getConnectionObj,
  getExternalNfts,
};

// #Infura Config
// ETHEREUM_NETWORK="rinkeby"
// INFURA_PROJECT_ID="ce3a3b9b80d1472bb6ee7fb3b1968712"
// SIGNER_PRIVATE_KEY="0x2ddc33401f9ed2d267a04721e8e1a2cc729e1df193862b7f529bb3939ef3592b"
// # DEMO_CONTRACT="0xf7642Ea9e61827306856d2C360a0162dcb2Da2f5"
// DEMO_CONTRACT="0x8A7528EcbeA4605f2F62FA0a0cB192e208c6d229"
