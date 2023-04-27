/* eslint-disable import/no-relative-packages */
// import app from '../../app';
import MarketplaceSMData from '../../../smart_contracts/marketplace/build/contracts/MarketplaceRoyalty.json';
import ERC721Data from '../../../smart_contracts/marketplace/build/contracts/IERC721.json';

const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

// const DecentralandNftLists = require('../../../database/models').nft_lists;
const ExternalSmartContracts =
  require('../../../database/models').external_smart_contracts;

const { abi: ERC721abi } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../ABI/ERC721.json'))
);
const {
  getTxnHashStatus,
  checkApprovalForAll,
  getConnectionObj,
} = require('../../helpers/web3Utils');

class BlockchainService {
  constructor(model) {
    this._model = model;
    this.getTxnHashStatus = this.getTxnHashStatus.bind(this);
    this.addExistingAssetDetails = this.addExistingAssetDetails.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.getAllExternalSmartContractDetails =
      this.getAllExternalSmartContractDetails.bind(this);
  }

  async getTxnHashStatus({ txnHash }) {
    const txnHashStatus = await getTxnHashStatus(txnHash);
    return { status: txnHashStatus };
  }

  async getApprovalForAllStatus({ smartContractAddress, owner, operator }) {
    const approvalStatus = await checkApprovalForAll(
      smartContractAddress,
      owner,
      operator
    );
    console.log({ approvalStatus });
    return { status: approvalStatus };
  }

  async addExistingAssetDetails(req) {
    const { smartContractAddress } = req;
    console.log(smartContractAddress);
    // const addr = '0xe5a4b900c7d3cEAae41D4d33014d27E93a2DA017';
    const { contract } = await getConnectionObj(
      ERC721abi,
      smartContractAddress
    );
    const isERC721Support = await contract.methods
      .supportsInterface('0x780e9d63')
      .call();
    let externalSmartContract;
    if (isERC721Support) {
      externalSmartContract = await ExternalSmartContracts.findOne({
        where: { smart_contract_address: smartContractAddress },
      });
      if (externalSmartContract) {
        throw Error('Smart Contract Address already exist');
      }
      const name = await contract.methods.name().call();
      const symbol = await contract.methods.symbol().call();
      externalSmartContract = await ExternalSmartContracts.create({
        smart_contract_address: smartContractAddress,
        address_type: 'ERC-721',
        blockchain_technology: 'Ethereum',
        asset_name: name,
        asset_symbol: symbol,
        added_by: 'user',
      });
      return externalSmartContract;
    }
    throw Error('Smart Contract Address is not of type ERC721');
  }

  async getAllExternalSmartContractDetails() {
    // const offset = 0;
    // const limit = 5;
    const result = await ExternalSmartContracts.findAll();
    return result;
  }

  async getConfig() {
    const configObj = {
      supportedWalletList: [
        {
          id: 1,
          name: 'Metamask',
          identifier: 'metamask',
          image_url:
            'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png',
          is_popular: true,
          is_enabled: false,
          order: 1,
        },
      ],
      supportedNetwork: {
        id: 1,
        name: process.env.ETHEREUM_NETWORK,
        network_type: process.env.NETWORK_TYPE,
        chain_id: parseInt(process.env.NETWORK_ID, 10),
        network_id: parseInt(process.env.NETWORK_ID, 10),
        native_currency: {
          symbol: 'ETH',
          name: 'ETH',
          decimals: '18',
        },
        marketplace_smart_contract_address:
          process.env.MARKETPLACE_SMART_CONTRACT,
        marketplace_fees: parseInt(process.env.MARKETPLACE_FEE, 10),
        nft_smart_contract_address: process.env.NFT_SMART_CONTRACT,
        marketplace_fees_recipient: process.env.MARKETPLACE_FEE_RECIPIENT,
      },
      minCompatibleVersion: '1.0.0',
      latestVersion: '1.0.0',
      marketplaceABI: MarketplaceSMData.abi,
      ERC721ABI: ERC721Data.abi,
      isCreatorRoyaltyEnabled: true,
      creatorRoyalty: 150,
    };
    return configObj;
  }
}

export default new BlockchainService();
