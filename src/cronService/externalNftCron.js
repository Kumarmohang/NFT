const nodeCron = require('node-cron');
const PlatformUsers = require('../../database/models').platform_users;
const { logger } = require('../services');
const { getLandDetails, getExternalNfts } = require('../helpers/web3Utils');
const ExternalSmartContracts =
  require('../../database/models').external_smart_contracts;
const { saveTokens } = require('../helpers/utils');

const fetchExternalNfts = async () => {
  const users = await PlatformUsers.findAll();
  const extSmartContractDetails = await ExternalSmartContracts.findAll();
  let typeId = null;
  for (let key = 0; key < extSmartContractDetails.length; key++) {
    for (let i = 0; i < users.length; i++) {
      let tokenMetadata;
      if (extSmartContractDetails[key].asset_name === 'Decentraland LAND') {
        typeId = '1b5e6b88-88c1-4d6b-91e3-fac83737260d';
        tokenMetadata = await getLandDetails(
          users[i].public_address,
          extSmartContractDetails[key].smart_contract_address // '0x9abd7d185b8dfbf15c949b1dcf5c638f3f49f6cf'
        );
      } else {
        typeId = 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db';
        tokenMetadata = await getExternalNfts(
          users[i].public_address,
          extSmartContractDetails[key].smart_contract_address
        );
      }
      await saveTokens(
        tokenMetadata,
        users[i],
        typeId,
        extSmartContractDetails[key].asset_name,
        extSmartContractDetails[key].smart_contract_address
      );
    }
  }
};

const main = async () => {
  await fetchExternalNfts().then((data) => {
    logger.info({ data });
  });
};

const fetchExternalNftsJob = nodeCron.schedule('0 */5 * * * *', main);

module.exports = { fetchExternalNftsJob };
