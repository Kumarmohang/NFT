/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import moment from 'moment';
import jwttoken from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const path = require('path');

// const util = require('util');
const multer = require('multer');
const NftLists = require('../../database/models').nft_lists;
const UserCollections = require('../../database/models').user_collections;
require('dotenv').config();

export const randomInt = (low, high) =>
  Math.floor(Math.random() * (high - low) + low);

export const randomVerfiedCode = () => randomInt(100000, 999999);

export const toNumber = (string) =>
  Number(string) || string === '0' ? Number(string) : string;

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const parseMilisecond = (ms) => moment(parseInt(ms, 10));

export const decodeToken = function (token) {
  return jwttoken.decode(token);
};

export const getStoragePath = function () {
  return path.join(__dirname, '../../', process.env.STORAGE_DIR);
};

export const getSmartContractAddress = function () {
  return process.env.NFT_SMART_CONTRACT;
};

// const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${getStoragePath()}`);
  },
  filename: (req, file, cb) => {
    console.log(file);
    file.originalname = uuidv4();
    // req.filename = file.filename;
    cb(null, file.originalname);
  },
});

export const uploadFile = multer({
  storage,
  // limits: { fileSize: maxSize },
});

// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;
// export const uploadFileMiddleware = util.promisify(uploadFile);

export const appendImageUrl = (url, filetype) => {
  switch (filetype) {
    case 'video':
      return `${process.env.VIDEO_RESOURCES_URL}/uploads/${url}`;
    case 'audio':
      return `${process.env.AUDIO_RESOURCES_URL}/uploads/${url}`;
    default:
      return `${process.env.RESOURCES_URL}/uploads/${url}`;
  }
};

export const addImageUrl = (results, internalKey = '', photo_keys = []) => {
  if (!internalKey) {
    if (results.rows) {
      const transformedData = results.rows.map((item) => {
        console.log('item   ', item);
        const rowItem = { ...item };
        if (item.file_url && !item.file_url.includes('http')) {
          rowItem.file_url = `${process.env.RESOURCES_URL}/${item.file_url}`;
          rowItem.thumbnail_url = `${process.env.RESOURCES_URL}/${item.thumbnail_url}`;
        }
        return rowItem;
      });
      results.rows = transformedData;
      return results;
    }
    if (results.file_url && !results.file_url.includes('http')) {
      results.file_url = `${process.env.RESOURCES_URL}/${results.file_url}`;
      results.thumbnail_url = `${process.env.RESOURCES_URL}/${results.thumbnail_url}`;
    }
  } else {
    if (results.rows) {
      const transformedData = results.rows.map((item) => {
        const rowItem = { ...item };
        if (
          item[internalKey].file_url &&
          !item[internalKey].file_url.includes('http')
        ) {
          rowItem[
            internalKey
          ].file_url = `${process.env.RESOURCES_URL}/${item[internalKey].file_url}`;
          rowItem[
            internalKey
          ].thumbnail_url = `${process.env.RESOURCES_URL}/${item[internalKey].thumbnail_url}`;
        }
        return rowItem;
      });
      results.rows = transformedData;
      return results;
    }
    if (
      results[internalKey].file_url &&
      !results[internalKey].file_url.includes('http')
    ) {
      results[
        internalKey
      ].file_url = `${process.env.RESOURCES_URL}/${results[internalKey].file_url}`;
      results[
        internalKey
      ].thumbnail_url = `${process.env.RESOURCES_URL}/${item[internalKey].thumbnail_url}`;
    }
  }
  return results;
};

const updateKeyImage = (item, keysList) => {
  const updatedItem = { ...item };
  keysList.map((key) => {
    if (item[key] && !item[key].includes('http')) {
      updatedItem[key] = `${process.env.RESOURCES_URL}/${item[key]}`;
    }
  });
  return updatedItem;
};

export const addImageUrl1 = (results, keys = [], internalKey = '') => {
  if (!results) {
    return;
  }
  if (!internalKey) {
    if (keys.length > 0) {
      if (results.length > 0) {
        const transformedData = results.map((item) => {
          const rowItem = { ...item };
          return updateKeyImage(rowItem, keys);
        });
        return transformedData;
      }
      return updateKeyImage(results, keys);
    }
  }
};

export const sortArray = (results, keyToSort) => {
  if (results.length > 0) {
    results.sort((a, b) => (a[keyToSort] > b[keyToSort] ? -1 : 1));
  }
  return results;
};

async function getCollectionId(name, publicAddress) {
  const collectionName = `${name}#${publicAddress.substring(
    publicAddress.length - 6,
    publicAddress.length
  )}`;
  const existingCollection = await UserCollections.findOne({
    where: {
      name: collectionName,
    },
    attributes: ['id'],
  });
  if (existingCollection) {
    return existingCollection.dataValues.id;
  }
  const collection = await UserCollections.create({
    name: collectionName,
    description: '',
    logo_url: `${process.env.RESOURCES_URL}/assets/default_collection.png`,
    cover_photo_url: `${process.env.RESOURCES_URL}/assets/default_collection.png`,
    public_address: publicAddress,
    user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
  });
  return collection.dataValues.id;
}

export async function saveTokens(
  tokenMetadata,
  user,
  typeId,
  collectionName,
  collectionSmartContractAddress
) {
  if (tokenMetadata) {
    for (let i = 0; i < tokenMetadata.length; i++) {
      const nftExists = await NftLists.findAll({
        where: {
          token_id: tokenMetadata[i].meta.id,
          smart_contract_address: tokenMetadata[i].smartContractAddress,
        },
      });
      if (nftExists.length === 0) {
        if (!tokenMetadata[0].meta.image) {
          tokenMetadata[0].meta.image = `${process.env.RESOURCES_URL}/assets/placeholder.webp`;
        }
        if (!tokenMetadata[0].meta.description) {
          tokenMetadata[0].meta.description = '';
        }
        if (!tokenMetadata[0].meta.external_url) {
          tokenMetadata[0].meta.external_url = '';
        }
        const collectionId = await getCollectionId(
          collectionName,
          collectionSmartContractAddress
        );
        await NftLists.create({
          name: tokenMetadata[i].meta.name,
          token_id: tokenMetadata[i].meta.id,
          type_id: typeId,
          description: tokenMetadata[i].meta.description,
          external_link: tokenMetadata[i].meta.external_url,
          file_url: tokenMetadata[i].meta.image,
          thumbnail_url: tokenMetadata[i].meta.image,
          content_type: 'image/jpeg',
          collection_id: collectionId,
          smart_contract_address: tokenMetadata[i].smartContractAddress,
          current_owner_public_key: user.dataValues.public_address,
          current_owner_id: user.dataValues.id,
          network_type: process.env.ETHEREUM_TYPE,
          network_id: process.env.ETHEREUM_ID,
          network_name: process.env.ETHEREUM_NETWORK,
          attributes: JSON.stringify(tokenMetadata[i].meta.attributes),
          is_enabled: true,
          mint_status: 'success',
          smart_contract_type: 'erc721',
          nft_type: 'external',
        });
      }
    }
  }
}
