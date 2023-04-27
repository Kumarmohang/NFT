/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
const nodeCron = require('node-cron');
const moment = require('moment');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const NftList = require('../../database/models').nft_lists;
const MarketplaceTransactions =
  require('../../database/models').marketplace_transactions;

const MarketplaceSellOrders =
  require('../../database/models').marketplace_sell_orders;
const LandingPageStats = require('../../database/models').landing_page_stats;
const ArtworkCollection = require('../../database/models').user_collections;
const PlatformUsers = require('../../database/models').platform_users;
const { logger } = require('../services');

const { abi } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../src/ABI/ERC721.json'))
);
// const { abi } = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, '../../src/ABI/LANDProxyTest.json'))
// );

// const { abi: ERC721abi } = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, '../../src/ABI/ERC721.json'))
// );

const network = process.env.ETHEREUM_NETWORK;
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
  )
);
let lock = false;
async function getTxnHash() {
  if (!lock) {
    lock = true;
    try {
      // const nftList = await NftList.findAll();
      const nftList = await NftList.findAll({
        attributes: ['id', 'mint_status', 'blockchain_txn_hash'],
        raw: true,
        where: {
          mint_status: 'commitInProgress',
        },
      });
      lock = false;
      return nftList;
    } catch (error) {
      lock = false;
      throw error;
    }
  }
}

async function getMarketplaceTxnHash() {
  if (!lock) {
    lock = true;
    try {
      // const nftList = await NftList.findAll();
      const nftList = await MarketplaceTransactions.findAll({
        attributes: [
          'id',
          'status',
          'blockchain_txn_hash',
          'nft_id',
          'buyer_id',
          'buyer_public_key',
        ],
        raw: true,
        where: {
          status: 'commitInProgress',
        },
      });
      lock = false;
      return nftList;
    } catch (error) {
      lock = false;
      throw error;
    }
  }
}

async function getTxnHashStatus(txnHash) {
  try {
    const txnReceipt = await web3.eth.getTransactionReceipt(txnHash);
    console.log('********** ', txnReceipt, txnHash);
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

const updateInitiatedBuyTransactions = async () => {
  const contract = new web3.eth.Contract(abi, process.env.NFT_SMART_CONTRACT);
  const transactions = await MarketplaceTransactions.findAll({
    where: {
      updatedAt: {
        [Op.gte]: moment().subtract(2, 'hours').toISOString(),
        [Op.lte]: moment().subtract(1, 'hours').toISOString(),
      },
      status: 'initiated',
    },
  });
  for (let i = 0; i < transactions.length; i++) {
    const nftDetails = await NftList.findOne({
      where: { id: transactions[i].dataValues.nft_id },
    });
    const tokenId = nftDetails.dataValues.token_id;
    let transaction;
    if (nftDetails.dataValues.mint_status === 'success') {
      const owner = await contract.methods.ownerOf(tokenId).call();
      if (owner === transactions[i].dataValues.buyer_public_key) {
        transaction = MarketplaceTransactions.update(
          {
            status: 'success',
          },
          {
            where: {
              id: transactions[i].dataValues.id,
            },
          }
        );
      } else {
        transaction = MarketplaceTransactions.update(
          {
            status: 'failed',
          },
          {
            where: {
              id: transactions[i].dataValues.id,
            },
          }
        );
      }
    } else {
      transaction = MarketplaceTransactions.update(
        {
          status: 'failed',
        },
        {
          where: {
            id: transactions[i].dataValues.id,
          },
        }
      );
    }
    logger.info(transaction);
  }
};

const tableUpdate = async () => {
  // const
  const data = await getTxnHash();
  if (data) {
    logger.info({ data });
    for (let i = 0; i < data.length; i++) {
      if (data[i].mint_status === 'commitInProgress') {
        const txStatus = await getTxnHashStatus(data[i].blockchain_txn_hash);
        const { id } = data[i];
        logger.info(txStatus);
        if (txStatus === 'SUCCESS') {
          await NftList.update(
            {
              mint_status: 'success',
              minted_datetime: new Date(),
            },
            {
              where: {
                id,
              },
            }
          );
        }
        //  return txStatus;
      }
    }
  }
  logger.info('No Data');
  return false;
};

const marketplaceTableUpdate = async () => {
  // const
  const data = await getMarketplaceTxnHash();
  if (data) {
    logger.info({ data });
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === 'commitInProgress') {
        const txStatus = await getTxnHashStatus(data[i].blockchain_txn_hash);
        const nftId = data[i].nft_id;
        logger.info(txStatus);
        const NftListRecord = await NftList.findByPk(nftId);

        if (txStatus === 'SUCCESS') {
          if (NftListRecord.mint_status === 'success') {
            await NftList.update(
              {
                mint_status: 'success',
                current_owner_public_key: data[i].buyer_public_key,
                current_owner_id: data[i].buyer_id,
              },
              {
                where: {
                  id: nftId,
                },
              }
            );
          } else {
            await NftList.update(
              {
                mint_status: 'success',
                current_owner_public_key: data[i].buyer_public_key,
                current_owner_id: data[i].buyer_id,
                minted_datetime: new Date(),
              },
              {
                where: {
                  id: nftId,
                },
              }
            );
          }

          await MarketplaceSellOrders.update(
            {
              status: 'success',
            },
            {
              where: {
                nft_id: nftId,
              },
            }
          );
          await MarketplaceTransactions.update(
            {
              status: 'success',
            },
            {
              where: {
                nft_id: nftId,
              },
            }
          );
        }
        // return txStatus;
      }
    }
  }
  logger.info('No Data');
  return false;
};

const updateLandingPageStats = async () => {
  const data = await LandingPageStats.findOne();
  const artworksCount = await NftList.count();
  const collectionCount = await ArtworkCollection.count();
  const userCount = await PlatformUsers.count();
  const transactionsCount = await MarketplaceTransactions.count();

  if (data.artworks_count !== artworksCount) {
    await LandingPageStats.update(
      {
        artworks_count: artworksCount,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  }
  if (data.collections_count !== collectionCount) {
    await LandingPageStats.update(
      {
        collections_count: collectionCount,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  }
  if (data.artist_count !== userCount) {
    await LandingPageStats.update(
      {
        artist_count: userCount,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  }
  if (data.total_transactions_count !== transactionsCount) {
    await LandingPageStats.update(
      {
        total_transactions_count: transactionsCount,
      },
      {
        where: {
          id: data.id,
        },
      }
    );
  }
};

const updateInitiatedMintTransactions = async () => {
  const contract = new web3.eth.Contract(abi, process.env.NFT_SMART_CONTRACT);
  const nfts = await NftList.findAll({
    where: {
      updatedAt: {
        [Op.gte]: moment().subtract(2, 'hours').toISOString(),
        [Op.lte]: moment().subtract(1, 'hours').toISOString(),
      },
      mint_status: 'initiated',
    },
  });
  for (let i = 0; i < nfts.length; i++) {
    contract.methods
      .ownerOf(nfts[i].token_id)
      .call()
      .then((res) => {
        logger.info('res', res);
        NftList.update(
          {
            mint_status: 'success',
            minted_datetime: new Date(),
          },
          {
            where: {
              id: nfts[i].id,
            },
          }
        );
      })
      .catch((error) => {
        logger.info('error', error);
        NftList.update(
          {
            mint_status: 'failed',
            minted_datetime: new Date(),
          },
          {
            where: {
              id: nfts[i].id,
            },
          }
        );
      });
  }
};

const main = async () => {
  await tableUpdate().then((data) => {
    logger.info({ data });
  });
  await marketplaceTableUpdate().then((data) => {
    logger.info({ data });
  });
  await updateLandingPageStats().then((data) => {
    logger.info({ data });
  });
  await updateInitiatedBuyTransactions().then((data) => {
    logger.info({ data });
  });
  await updateInitiatedMintTransactions().then((data) => {
    logger.info({ data });
  });
};
const job = nodeCron.schedule('* * * * * *', main);

// nodeCron;

// getTxnHash;

module.exports = { job };
// getTxnHashStatus(
//   '0x9e198f2a4f383817b534991e3fd4edb7901fbd30a4e59d088a1bd5433ebcf637'
// );
