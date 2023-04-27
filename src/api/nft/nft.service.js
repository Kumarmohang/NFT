import { AUTH_OBJ } from '../../config/googleAuth';
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import { COLLECTION_URL } from '../constants';

const { google } = require('googleapis');
const fs = require('fs');
const { Sequelize, Op } = require('sequelize');
const moment = require('moment');
const UserNfts = require('../../../database/models').user_artworks;
const youtubePubished = require('../../../database/models').youtube;
const MasterTypes = require('../../../database/models').master_types;
const ArtworkThemes = require('../../../database/models').artwork_themes;
const MasterThemes = require('../../../database/models').master_themes;
const ArtworkCollection = require('../../../database/models').user_collections;
const PlatformUsers = require('../../../database/models').platform_users;
const {
  getSmartContractAddress,
  appendImageUrl,
  sortArray,
} = require('../../helpers/utils');
const {
  getNetworkDetails,
  getTokenId,
  getBuyTxData,
} = require('../../helpers/web3Utils');
const { serializeToJson } = require('../../helpers/serialize');

const MarketplaceTransactions =
  require('../../../database/models').marketplace_transactions;

const MarketplaceSellOrders =
  require('../../../database/models').marketplace_sell_orders;

const NftLists = require('../../../database/models').nft_lists;

const NftLikes = require('../../../database/models').nft_likes;
const DecentralandNftLists =
  require('../../../database/models').decentraland_nft_lists;

class NftsService {
  constructor(model) {
    this._model = model;
    this.getNfts = this.getNfts.bind(this);
    this.createNfts = this.createNfts.bind(this);
    this.editNfts = this.editNfts.bind(this);
    this.nftDetails = this.nftDetails.bind(this);
    this.nftHistory = this.nftHistory.bind(this);
    this.toggleNftLike = this.toggleNftLike.bind(this);
    this.getTrendingNfts = this.getTrendingNfts.bind(this);
    this.sellNfts = this.sellNfts.bind(this);
    this.buyNfts = this.buyNfts.bind(this);
    this.cancelNfts = this.cancelNfts.bind(this);
    this.mintNft = this.mintNft.bind(this);
    this.publishNft = this.publishNft.bind(this);
    this.initiateBuyTransaction = this.initiateBuyTransaction.bind(this);
    this.initiateMint = this.initiateMint.bind(this);
  }

  addForSaleFlag = (results, forSaleFilter = false) => {
    let transformedData = results.rows.map((item) => {
      const rowItem = { ...item };
      if (
        rowItem.marketplace_sell_orders &&
        rowItem.marketplace_sell_orders.length > 0
      ) {
        rowItem.for_sale =
          rowItem.marketplace_sell_orders[0].status === 'active';
        rowItem.txn_value = rowItem.marketplace_sell_orders[0].txn_value;
      } else {
        rowItem.for_sale = false;
        rowItem.txn_value = 0;
      }
      return rowItem;
    });
    // transformedData.sort((a, b) => (a.for_sale > b.for_sale ? -1 : 1));
    if (forSaleFilter) {
      transformedData = transformedData.filter((item) => item.for_sale);
    }
    results.rows = transformedData;
    return results;
  };

  sortByForSale = (results, order = 'desc') => {
    const transformedData = [...results.rows];
    if (order === 'asc') {
      transformedData.sort((a, b) => (a.for_sale > b.for_sale ? 1 : -1));
    } else {
      transformedData.sort((a, b) => (a.for_sale > b.for_sale ? -1 : 1));
    }
    results.rows = transformedData;
    return results;
  };

  sortByPrice = (results, order = 'asc') => {
    const transformedData = [...results.rows];

    if (order === 'asc') {
      transformedData.sort((a, b) => (a.txn_value >= b.txn_value ? 1 : -1));
    } else {
      transformedData.sort((a, b) => (a.txn_value < b.txn_value ? 1 : -1));
    }
    results.rows = transformedData;
    return results;
  };

  publishVideo = async (auth, fileUrl, title) => {
    const service = google.youtube('v3');
    try {
      return service.videos.insert({
        auth,
        part: 'snippet,status',
        requestBody: {
          snippet: {
            title,
            categoryId: 22,
            defaultLanguage: 'en',
            defaultAudioLanguage: 'en',
          },
          status: {
            privacyStatus: 'public',
          },
        },
        media: {
          body: fs.createReadStream(
            `${__dirname}/../../../resources/static/${
              fileUrl.split('static/video/')[1]
            }`
          ),
        },
      });
    } catch (err) {
      return err;
    }
  };

  addKey = (results, key, value) => {
    const transformedData = results.rows.map((item) => {
      const rowItem = { ...item };
      rowItem.dataValues[key] = value;
      return rowItem.dataValues;
    });
    results.rows = transformedData;
    return results;
  };

  // addImageUrl = (results, internalKey = '') => {
  //   if (!internalKey) {
  //     if (results.rows) {
  //       const transformedData = results.rows.map((item) => {
  //         const rowItem = { ...item };
  //         if (!item.file_url.includes('http')) {
  //           rowItem.file_url = `${CONFIG.RESOURCES_URL}/${item.file_url}`;
  //           rowItem.thumbnail_url = `${CONFIG.RESOURCES_URL}/${item.thumbnail_url}`;
  //         }
  //         return rowItem;
  //       });
  //       results.rows = transformedData;
  //       return results;
  //     }
  //     if (!results.file_url.includes('http')) {
  //       results.file_url = `${CONFIG.RESOURCES_URL}/${results.file_url}`;
  //       results.thumbnail_url = `${CONFIG.RESOURCES_URL}/${results.thumbnail_url}`;
  //     }
  //   } else {
  //     if (results.rows) {
  //       const transformedData = results.rows.map((item) => {
  //         const rowItem = { ...item.toJSON() };
  //         if (!item[internalKey].file_url.includes('http')) {
  //           rowItem[
  //             internalKey
  //           ].file_url = `${CONFIG.RESOURCES_URL}/${item[internalKey].file_url}`;
  //           rowItem[
  //             internalKey
  //           ].thumbnail_url = `${CONFIG.RESOURCES_URL}/${item[internalKey].thumbnail_url}`;
  //         }
  //         return rowItem;
  //       });
  //       results.rows = transformedData;
  //       return results;
  //     }
  //     if (!results[internalKey].file_url.includes('http')) {
  //       results[
  //         internalKey
  //       ].file_url = `${CONFIG.RESOURCES_URL}/${results[internalKey].file_url}`;
  //       results[
  //         internalKey
  //       ].thumbnail_url = `${CONFIG.RESOURCES_URL}/${item[internalKey].thumbnail_url}`;
  //     }
  //   }
  //   return results;
  // };

  async getNfts(
    { query, user } /* ,
    user */
  ) {
    // const { //   limit = 10, //   offset = 0, //   search, //   types, //   currency, //   priceTo, //   priceFrom, // } = req.query;
    const {
      limit,
      offset,
      search,
      typeId,
      themeId,
      collectionId,
      currency,
      priceTo,
      priceFrom,
      userId,
      forSale,
      sortBy,
    } = query;
    const whereType = [];
    const whereTheme = {};
    const whereCollection = {};
    const whereUserId = {};

    const loggedInuserId = {};
    console.log({ user });
    if (user) {
      loggedInuserId.user_id = user.userDetails.id;
    }
    // console.log('****** ', typeId);
    // console.log('type --- ', typeId);
    let boolFlag = false;
    if (typeId) {
      const typeIdArr = typeId.split(',');
      // eslint-disable-next-line array-callback-return
      typeIdArr.map((item) => {
        whereType.push({
          id: item,
        });
      });
      // whereType.id = typeId;
    }
    if (themeId) {
      whereTheme.id = themeId;
    }
    if (collectionId) {
      whereCollection.id = collectionId;
    }
    if (priceFrom !== 0 || priceTo !== Number.MAX_SAFE_INTEGER) {
      boolFlag = true;
    }
    if (userId) {
      whereUserId.creator_id = userId;
    }

    // marketplace sell orders enable/disable flag
    let sellOrdersFlag = false;
    if (forSale) {
      sellOrdersFlag = true;
    }

    let sortOrder = ['no_of_likes', 'DESC'];

    if (sortBy) {
      if (sortBy === 'createdAt_asc') {
        sortOrder = ['createdAt', 'ASC'];
      }
      if (sortBy === 'createdAt_desc') {
        sortOrder = ['createdAt', 'DESC'];
      }
      if (sortBy === 'price_asc') {
        sortOrder = [MarketplaceSellOrders, 'txn_value', 'ASC'];
        sellOrdersFlag = true;
      }
      if (sortBy === 'price_desc') {
        sortOrder = [MarketplaceSellOrders, 'txn_value', 'DESC'];
        sellOrdersFlag = true;
      }
    }

    const result = await NftLists.findAndCountAll({
      where: {
        [Op.and]: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
          ...whereUserId,
        },
      },
      include: [
        {
          model: PlatformUsers,
          required: false,
          as: 'creator',
        },
        {
          model: PlatformUsers,
          required: false,
          as: 'current_owner',
        },
        {
          model: MasterTypes,
          required: whereType.length > 0,
          where: {
            [Op.or]: whereType,
          },
        },
        {
          model: ArtworkThemes,
          required: false,
          where: {
            ...whereTheme,
          },
          include: [
            {
              model: MasterThemes,
              required: false,
            },
          ],
        },
        {
          model: ArtworkCollection,
          required: false,
          where: {
            ...whereCollection,
          },
        },
        {
          model: MarketplaceSellOrders,
          required: sellOrdersFlag,
          where: {
            status: 'active',
          },
        },
        {
          model: MarketplaceTransactions,
          required: boolFlag,
          where: {
            txn_value: {
              [Op.between]: [priceFrom, priceTo],
              // [Op.and]: {
              //   [Op.lte]: priceTo,
              //   [Op.gte]: priceFrom,
              // },
            },
            txn_symbol: {
              [Op.like]: `%${currency}%`,
            },
          },
        },
        {
          model: NftLikes,
          required: false,
          where: {
            ...loggedInuserId,
          },
        },
      ],
      order: [sortOrder],
      limit,
      offset,
      subQuery: false,
      // raw: true,
      // nest: true,
    });

    // result = serializeToJson(result, [], 'findAndCountAll');
    // result = this.addForSaleFlag(result, forSale);
    // result = addImageUrl(result);

    // if (sortBy) {
    //   if (sortBy === 'price_asc') {
    //     result = this.sortByPrice(result, 'asc');
    //   }
    //   if (sortBy === 'price_desc') {
    //     result = this.sortByPrice(result, 'desc');
    //   }
    // } else {
    //   result = this.sortByForSale(result);
    // }
    return { ...result, limit, offset };
  }

  async createNfts(req) {
    const {
      name,
      // fileUrl,
      typeId,
      description = '',
      externalLink = '',
      collectionId = 0,
      isEnabled,
      // noOfLikes,
      // noOfWishlist,
      // userId,
      // creatorPublicAddress = '',
      // smartContractAddress = '',
      creatorRoyalty = 0,
    } = req.body;
    let thumbnail;
    const { files } = req;

    const { id: userId, public_address: creatorPublicAddress } =
      req.user.userDetails;
    console.log('**** ', files);
    const fileUrl = appendImageUrl(
      files.file[0].originalname,
      files.file[0].mimetype.split('/')[0]
    );
    const fileType = files.file[0].mimetype;
    if (files.thumbnail) {
      thumbnail = appendImageUrl(
        files.thumbnail[0].originalname,
        files.thumbnail[0].mimetype.split('/')[0]
      );
    } else if (fileType.split('/')[0] === 'audio') {
      thumbnail = `${process.env.RESOURCES_URL}/assets/Audio.png`;
    }
    const smartContractAddress = getSmartContractAddress();
    const existingArtwork = await NftLists.findOne({
      where: {
        name,
      },
    });
    if (existingArtwork) {
      return existingArtwork;
    }

    // default collection create
    let collectionObj;
    if (collectionId !== 0) {
      collectionObj = await ArtworkCollection.findOne({
        where: {
          user_id: userId,
          name: `Default #${creatorPublicAddress.slice(2, 8)}`,
        },
      });
      if (!collectionObj) {
        collectionObj = await ArtworkCollection.create({
          name: `Default #${creatorPublicAddress.slice(2, 8)}`,
          description: 'This is Default Collection',
          logo_url: COLLECTION_URL.default,
          cover_photo_url: '',
          public_address: creatorPublicAddress,
          user_id: userId,
        });
      }
    } else {
      collectionObj = await ArtworkCollection.findOne({
        where: {
          id: collectionId,
        },
      });
      if (!collectionObj) {
        throw new Error('Collection does not exists');
      }
    }

    const userArtworksObj = await UserNfts.create({
      name,
      type_id: typeId,
      description,
      external_link: externalLink,
      file_url: fileUrl,
      content_type: fileType,
      thumbnail_url: thumbnail,
      collection_id: collectionObj.id,
      is_enabled: isEnabled,
      no_of_likes: 0,
      no_of_wishlist: 0,
      user_id: userId,
      creator_public_address: creatorPublicAddress,
      smart_contract_address: smartContractAddress,
    });

    const networkDetails = getNetworkDetails();

    await NftLists.create({
      artwork_id: userArtworksObj.id,
      name,
      type_id: typeId,
      description,
      external_link: externalLink,
      file_url: fileUrl,
      content_type: fileType,
      thumbnail_url: thumbnail,
      collection_id: collectionObj.id,
      is_enabled: isEnabled,
      no_of_likes: 0,
      no_of_wishlist: 0,
      ipfs_hash: '',
      is_enabled: true,
      token_id: getTokenId(),
      creator_public_address: userArtworksObj.creator_public_address,
      creator_id: userArtworksObj.user_id,
      current_owner_public_key: userArtworksObj.creator_public_address,
      current_owner_id: userArtworksObj.user_id,
      network_type: networkDetails.type,
      network_id: networkDetails.network_id,
      network_name: networkDetails.name,
      blockchain_networks_id: 1,
      mint_status: 'pending',
      smart_contract_address: getSmartContractAddress(),
      blockchain_txn_hash: '',
      smart_contract_type: 'erc721',
      nft_type: 'internal',
      creator_royalty: creatorRoyalty,
      createdAt: new Date(),
    });

    return userArtworksObj;
  }

  async editNfts(req) {
    const { name, description, type, externalLink, collectionName } = req.body;
    const { id } = req.params;
    const res = { status: 'Nothing updated' };
    console.log(name);
    if (name) {
      const result = await NftLists.update(
        { name },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Artwork Updated';
      res.result = result;
    }
    if (description) {
      const result = await NftLists.update(
        { description },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Artwork Updated';
      res.result = result;
    }
    if (type) {
      const typeId = await MasterTypes.findOne({
        attributes: ['id'],
        where: {
          name: {
            [Op.like]: `%${type}%`,
          },
        },
      });
      console.log(typeId.id);
      const result = await NftLists.update(
        {
          type_id: parseInt(typeId.id, 10),
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Artwork Updated';
      res.result = result;
    }
    if (externalLink) {
      const result = await NftLists.update(
        {
          external_link: externalLink,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Artwork Updated';
      res.result = result;
    }
    if (collectionName) {
      const collectionId = await ArtworkCollection.findOne({
        where: {
          name: collectionName,
        },
        attributes: ['id'],
      });
      const result = await NftLists.update(
        {
          collection_id: parseInt(collectionId.id, 10),
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Artwork Updated';
      res.result = result;
    }
    // console.log(res);
    return res;
  }

  async nftDetails(req) {
    const artworkId = req.params.id;
    const { assetType = 'internal' } = req.query;

    if (assetType === 'internal') {
      const result = await NftLists.findOne({
        where: {
          id: artworkId,
        },
        include: [
          {
            model: MarketplaceSellOrders,
            where: {
              status: 'active',
            },
            required: false,
          },
          {
            model: MarketplaceTransactions,
            include: [
              {
                model: PlatformUsers,
                as: 'buyer',
                attributes: [
                  'id',
                  'public_address',
                  'profile_photo',
                  'nickname',
                ],
              },
              {
                model: PlatformUsers,
                as: 'seller',
                attributes: [
                  'id',
                  'public_address',
                  'profile_photo',
                  'nickname',
                ],
              },
            ],
            required: false,
          },
          {
            model: PlatformUsers,
            required: false,
            as: 'creator',
          },
          {
            model: PlatformUsers,
            required: false,
            as: 'current_owner',
          },
          {
            model: ArtworkCollection,
            required: false,
          },
          {
            model: MasterTypes,
            required: false,
          },
          {
            model: youtubePubished,
            required: false,
          },
        ],
      });

      // result = serializeToJson(result, [], 'findOne');
      // result = addImageUrl(result);
      // console.log({ result });
      return result;
    }
    const result = await DecentralandNftLists.findOne({
      where: {
        id: artworkId,
      },
      include: [
        {
          model: PlatformUsers,
          required: false,
        },
        {
          model: MasterTypes,
          required: false,
        },
      ],
    });
    return result;
  }

  async nftHistory(req) {
    const artworkId = req.params.id;
    const { user_id: userId, limit, offset } = req.query;

    // const whereArtworkIdvalues = {};
    const whereUserIdvalues = [];

    // if (artworkId) {
    //   whereArtworkIdvalues.id = artworkId;
    // }

    if (userId) {
      whereUserIdvalues.push({ buyer_id: userId });
      whereUserIdvalues.push({ seller_id: userId });
    }

    let MarketplaceTransactionsResult =
      await MarketplaceTransactions.findAndCountAll({
        limit,
        offset,
        where: {
          nft_id: artworkId,
          // ...whereArtworkIdvalues,
          // [Op.or]: whereUserIdvalues,
        },
        include: [
          {
            model: NftLists,
          },
          {
            model: PlatformUsers,
            as: 'buyer',
          },
          {
            model: PlatformUsers,
            as: 'seller',
          },
        ],
      });

    const processedResult = {};
    processedResult.rows = [];

    if (MarketplaceTransactionsResult.rows.length !== 0) {
      MarketplaceTransactionsResult = this.addKey(
        MarketplaceTransactionsResult,
        'transaction_type',
        'Transfer'
      );
      // processedResult.rows = [...result.rows];
      processedResult.rows.push(...MarketplaceTransactionsResult.rows);
      // result.rows = decentralandNftResult.rows;
    }

    let MarketplaceSellResult = await MarketplaceSellOrders.findAndCountAll({
      limit,
      offset,
      where: {
        nft_id: artworkId,
        // ...whereArtworkIdvalues,
        // [Op.or]: whereUserIdvalues,
      },
      include: [
        {
          model: NftLists,
        },
        {
          model: PlatformUsers,
          as: 'seller',
        },
      ],
    });

    if (MarketplaceSellResult.rows.length !== 0) {
      MarketplaceSellResult = this.addKey(
        MarketplaceSellResult,
        'transaction_type',
        'List'
      );
      // processedResult.rows = [...result.rows];
      processedResult.rows.push(...MarketplaceSellResult.rows);
      // result.rows = decentralandNftResult.rows;
    }
    processedResult.rows = [...sortArray(processedResult.rows, 'createdAt')];

    return processedResult;
  }

  async toggleNftLike(req) {
    const artworkId = req.params.id;
    const { isLike } = req.body;
    const { id: userId, public_address: userPublicAddress } =
      req.user.userDetails;
    const artworkLikeRecord = await NftLikes.findOne({
      where: {
        user_id: userId,
        nft_id: artworkId,
      },
    });

    let result;
    if (isLike === true) {
      // check if record already exist
      if (!artworkLikeRecord) {
        // add new record
        result = await NftLikes.create({
          nft_id: artworkId,
          user_id: userId,
          user_public_key: userPublicAddress,
          is_enabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // update the like table
        result = await NftLikes.update(
          { is_enabled: true, updatedAt: new Date() },
          {
            where: {
              user_id: userId,
              nft_id: artworkId,
            },
          }
        );
      }

      // increment the count of user_artworks table
      await NftLists.increment('no_of_likes', {
        by: 1,
        where: {
          id: artworkId,
        },
      });
    } else if (isLike === false) {
      // check if record already exist else ignore any update
      if (artworkLikeRecord) {
        // update the like table
        result = await NftLikes.update(
          { is_enabled: false, updatedAt: new Date() },
          {
            where: {
              user_id: userId,
              nft_id: artworkId,
            },
          }
        );

        // decrement the count of user artworks table
        await NftLists.decrement('no_of_likes', {
          by: 1,
          where: {
            id: artworkId,
          },
        });
      } else {
        // return error that operation is not valid
        console.log('Error');
      }
    }

    // console.log(result);
    return result;
  }

  async getTrendingNfts({
    aggregate_by: aggregateBy,
    duration,
    duration_unit: durationUnit,
    typeId,
    theme,
    limit,
    offset,
  }) {
    // const { offset = 0, limit = 0 } = query;

    let result = {};

    const whereType = [];
    const whereTheme = {};
    if (typeId) {
      const typeIdArr = typeId.split(',');
      // eslint-disable-next-line array-callback-return
      typeIdArr.map((item) => {
        whereType.push({
          id: item,
        });
      });
      // whereType.id = typeId;
    }
    let whereCondition = {};
    if (whereType.length > 0) {
      whereCondition = {
        where: {
          [Op.or]: whereType,
        },
      };
    }
    // console.log(whereType);
    if (theme) {
      whereTheme.id = theme;
    }

    // if (durationUnit && durationUnit === 'days') {
    //   duration *= 24;
    // }
    // if (durationUnit && durationUnit === 'months') {
    //   // TODO: implement get total days of a month
    //   duration *= 24;
    // }

    if (aggregateBy === 'no_of_likes') {
      result = await this._model.findAndCountAll({
        limit,
        offset,
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM user_likes WHERE
                                    user_likes.artwork_id = user_artworks.id
                                    AND 'user_likes.createdAt' > '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                                    AND user_likes.is_enabled = true
                            )`),
              'count_likes',
            ],
          ],
        },
        order: [[Sequelize.col('count_likes'), 'DESC']],
        include: [
          {
            model: PlatformUsers,
            required: true,
          },
          {
            model: MasterTypes,
            required: true,
            ...whereCondition,
          },
          // {
          //   model: ArtworkThemes,
          //   require: true,
          //   where: {
          //     ...whereTheme,
          //   },
          // },
        ],
      });
    }

    // if (aggregateBy === 'value_of_transactions') {
    //   result = await this._model.findAndCountAll({
    //     limit,
    //     offset,
    //     attributes: {
    //       include: [
    //         [
    //           Sequelize.literal(`(
    //                             SELECT COALESCE(SUM(txn_value),0)
    //                             FROM marketplace_transactions WHERE
    //                                 marketplace_transactions.artwork_id = user_artworks.id
    //                                 AND 'marketplace_transactions.createdAt' >= '${moment()
    //                                   .subtract(duration, durationUnit)
    //                                   .utc()
    //                                   .format('YYYY-MM-DD HH:mm:ss')}'
    //                                 AND marketplace_transactions.status = 'success'
    //                         )`),
    //           'value_of_transactions',
    //         ],
    //       ],
    //     },
    //     order: [[Sequelize.col('value_of_transactions'), 'DESC']],
    //     include: [
    //       {
    //         model: PlatformUsers,
    //         require: true,
    //       },
    //       {
    //         model: MasterTypes,
    //         require: true,
    //         where: {
    //           ...whereType,
    //         },
    //       },
    //       {
    //         model: ArtworkThemes,
    //         require: true,
    //         where: {
    //           ...whereTheme,
    //         },
    //       },
    //     ],
    //   });
    // }
    if (aggregateBy === 'value_of_transactions') {
      result = await NftLists.findAndCountAll({
        limit,
        offset,
        // attributes: {
        //   include: [
        //     [
        //       Sequelize.literal(`(
        //                         SELECT COALESCE(SUM(txn_value),0)
        //                         FROM marketplace_transactions WHERE
        //                             marketplace_transactions.artwork_id = user_artworks.id
        //                             AND 'marketplace_transactions.createdAt' >= '${moment()
        //                               .subtract(duration, durationUnit)
        //                               .utc()
        //                               .format('YYYY-MM-DD HH:mm:ss')}'
        //                             AND marketplace_transactions.status = 'success'
        //                     )`),
        //       'value_of_transactions',
        //     ],
        //   ],
        // },
        // order: [[Sequelize.col('value_of_transactions'), 'DESC']],
        include: [
          {
            model: PlatformUsers,
            required: false,
            as: 'creator',
          },
          {
            model: PlatformUsers,
            required: false,
            as: 'current_owner',
          },
          {
            model: MasterTypes,
            required: true,
            ...whereCondition,
          },
          // {
          //   model: ArtworkThemes,
          //   require: true,
          //   where: {
          //     ...whereTheme,
          //   },
          // },
          // {
          //   model: MarketplaceTransactions,
          // },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                                SELECT COALESCE(SUM(txn_value),0)
                                FROM marketplace_sell_orders WHERE
                                    marketplace_sell_orders.nft_id = nft_lists.id
                                    AND 'marketplace_sell_orders.createdAt' >= '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                            )`),
              'value_of_transactions',
            ],
          ],
        },
        order: [[Sequelize.col('value_of_transactions'), 'DESC']],
        // {
        //   model: MasterTypes,
        //   require: true,
        //   where: {
        //     ...whereType,
        //   },
        // },
        // {
        //   model: ArtworkThemes,
        //   require: true,
        //   where: {
        //     ...whereTheme,
        //   },
        // },
        // ],
      });
    }

    if (aggregateBy === 'count_of_transactions') {
      result = await this._model.findAndCountAll({
        limit,
        offset,
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM marketplace_transactions WHERE
                                    marketplace_transactions.artwork_id = user_artworks.id
                                    AND 'marketplace_transactions.createdAt' > '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                                    AND marketplace_transactions.status = 'complete'
                            )`),
              'value_of_transactions',
            ],
          ],
        },
        order: [[Sequelize.col('value_of_transactions'), 'DESC']],
        include: [
          {
            model: PlatformUsers,
            required: true,
          },
          {
            model: MasterTypes,
            required: true,
            ...whereCondition,
          },
          // {
          //   model: ArtworkThemes,
          //   require: true,
          //   where: {
          //     ...whereTheme,
          //   },
          // },
        ],
      });
    }

    // console.log(result);
    // result = addImageUrl(result);
    // console.log(result);
    return result;
  }

  async sellNfts(req) {
    const artworkId = req.params.id;
    const {
      txnValue,
      txnSymbol,
      hash,
      nonce,
      signature,
      marketplaceFees,
      marketplaceFeesRecipient,
    } = req.body;
    console.log(artworkId, txnValue, txnSymbol);

    const { id: sellerId, public_address: sellerPublicAddress } =
      req.user.userDetails;
    // get artwork details from artworks table
    const nftListRecord = await NftLists.findByPk(artworkId);
    // const nftListRecord = await NftLists.findOne({
    //   where: {
    //     id: artworkId,
    //   },
    // });

    if (nftListRecord) {
      const artworkRecord = await UserNfts.findOne({
        where: {
          id: nftListRecord.artwork_id,
        },
      });

      const marketplaceRecord = await MarketplaceSellOrders.findOne({
        where: {
          nft_id: artworkId,
          status: 'active',
        },
      });
      // create tokenURI
      // const fileUrl = artworkRecord.file_url;

      // get network details
      // const networkDetails = getNetworkDetails();
      // console.log('minting......');
      // // mint the nft
      // const mintedToken = await Mint(fileUrl);
      // console.log(mintedTokenId);

      // update the minted status to nft_list table
      // const nftListRecord = await NftLists.create({
      //   artwork_id: artworkRecord.id,
      //   ipfs_hash: '',
      //   is_enabled: true,
      //   token_id: mintedToken.tokenId,
      //   blockchain_txn_hash: mintedToken.transactionHash,
      //   current_owner_public_key: artworkRecord.creator_public_address,
      //   current_owner_id: artworkRecord.user_id,
      //   network_type: networkDetails.type,
      //   network_id: networkDetails.network_id,
      //   network_name: networkDetails.name,
      //   createdAt: new Date(),
      // });
      // const nftListRecord = await NftLists.update({

      // }, {where:{
      //   artwork_id: artworkId
      // }})
      if (!marketplaceRecord) {
        console.log('signature  ', signature);
        return MarketplaceSellOrders.create({
          nft_id: nftListRecord.id,
          artwork_id: artworkRecord.id,
          seller_id: sellerId,
          seller_public_key: sellerPublicAddress,
          marketplace_publish_datetime: new Date(),
          status: 'active',
          status_reason: '',
          txn_value: txnValue,
          txn_symbol: txnSymbol,
          collection_id: nftListRecord.collection_id,
          txn_hash: hash,
          nonce,
          signature,
          marketplace_fees: marketplaceFees,
          marketplace_fees_recipient: marketplaceFeesRecipient,
        });
      }
    }
  }

  async initiateBuyTransaction(req) {
    const nftId = req.params.id;
    const { id: buyerId, public_address: buyerPublicAddress } =
      req.user.userDetails;

    // const buyerId = 'ae54be6c-d012-49f9-808c-5c25f2bb4047';
    // const buyerPublicAddress = '0x72dcaf4e046b3ef98e47ace1ae46907104ccbada';

    const marketplaceSellRecord = await MarketplaceSellOrders.findOne({
      where: {
        nft_id: nftId,
        status: 'active',
      },
    });
    const nftDetails = await NftLists.findOne({
      where: {
        id: nftId,
      },
    });
    if (marketplaceSellRecord && marketplaceSellRecord.status === 'active') {
      const marketplaceBuyInitTime = new Date();
      const status = 'initiated';
      const marketplaceTransaction = await MarketplaceTransactions.findOne({
        where: {
          nft_id: nftId,
          marketplace_sell_record_id: marketplaceSellRecord.id,
          status: 'initiated',
        },
      });
      if (!marketplaceTransaction) {
        await MarketplaceTransactions.create({
          nft_id: marketplaceSellRecord.nft_id,
          artwork_id: marketplaceSellRecord.artwork_id,
          buyer_id: buyerId,
          buyer_public_key: buyerPublicAddress,
          seller_id: marketplaceSellRecord.seller_id,
          seller_public_key: marketplaceSellRecord.seller_public_key,
          marketplace_buy_init_time: marketplaceBuyInitTime || 0,
          marketplace_buy_end_time: 0,
          status,
          status_reason: '',
          marketplace_sell_record_id: marketplaceSellRecord.id,
          txn_value: marketplaceSellRecord.txn_value,
          txn_symbol: marketplaceSellRecord.txn_symbol,
          blockchain_txn_hash: '',
          collection_id: marketplaceSellRecord.collection_id,
        });
      }
    }
    const txData = await getBuyTxData(
      nftDetails.dataValues.token_id,
      nftDetails.nft_type,
      nftDetails.creator_royalty,
      nftDetails.creator_public_address,
      marketplaceSellRecord.seller_public_key,
      marketplaceSellRecord.signature,
      marketplaceSellRecord.nonce,
      marketplaceSellRecord.marketplace_fees,
      marketplaceSellRecord.marketplace_fees_recipient,
      marketplaceSellRecord.txn_value
    );
    return txData;
  }

  async buyNfts(req) {
    const artworkId = req.params.id;
    const { transactionHash, txStatus } = req.body;
    // get artwork details from marketplace sell orders table
    const marketplaceSellRecord = await MarketplaceSellOrders.findOne({
      where: {
        nft_id: artworkId,
        status: 'active',
      },
      include: [
        {
          model: NftLists,
        },
      ],
    });
    if (marketplaceSellRecord && marketplaceSellRecord.status === 'active') {
      // create a new record in marketplace_transactions table
      if (txStatus === 'rejected') {
        const marketplaceBuyEndTime = new Date();
        await MarketplaceTransactions.update(
          {
            status: txStatus,
            marketplace_buy_end_time: marketplaceBuyEndTime,
            blockchain_txn_hash: '',
          },
          {
            where: {
              nft_id: artworkId,
              marketplace_sell_record_id: marketplaceSellRecord.id,
              status: 'initiated',
            },
          }
        );
      } else {
        const status = 'commitInProgress';

        const marketplaceBuyEndTime = new Date();
        await MarketplaceTransactions.update(
          {
            status,
            marketplace_buy_end_time: marketplaceBuyEndTime,
            blockchain_txn_hash: transactionHash,
          },
          {
            where: {
              nft_id: artworkId,
              marketplace_sell_record_id: marketplaceSellRecord.id,
              status: 'initiated',
            },
          }
        );

        // update the Marketplace sell orders table with status complete

        await MarketplaceSellOrders.update(
          {
            status: 'success',
          },
          {
            where: {
              id: marketplaceSellRecord.id,
            },
          }
        );
      }
    } else {
      // throw error
      console.log('Error');
    }
  }

  async cancelNfts(req) {
    // const { status } = req.body;
    const { artworkId } = req.body;
    // const { id } = req.params;
    return UserNfts.update(
      {
        status: 'cancel',
      },
      {
        where: {
          artwork_id: artworkId,
        },
      }
    );
  }

  async initiateMint(req) {
    const artworkId = req.params.id;
    return NftLists.update(
      {
        mint_status: 'initiated',
      },
      {
        where: {
          id: artworkId,
        },
      }
    );
  }

  async mintNft(req) {
    const { txnHash, smartContractAddress } = req.body;
    const artworkId = req.params.id;
    return NftLists.update(
      {
        blockchain_txn_hash: txnHash,
        smart_contract_address: smartContractAddress,
        mint_status: 'commitInProgress',
      },
      {
        where: {
          id: artworkId,
        },
      }
    );
  }

  async publishNft(req) {
    const { id } = req.params;
    const result = await NftLists.findAll({
      where: {
        id,
      },
      attributes: ['file_url', 'name'],
    });
    const youtubePubishedRecord = await youtubePubished.findOne({
      where: {
        artwork_id: id,
      },
      attributes: ['publish_status'],
    });
    if (!youtubePubishedRecord) {
      await youtubePubished.create({
        publish_status: 'pending',
        updatedAt: new Date().toLocaleString(),
        artwork_id: id,
      });
    } else {
      if (youtubePubishedRecord.dataValues.publish_status === 'published') {
        return 'Video is already published';
      }
      await youtubePubished.update(
        {
          publish_status: 'pending',
          updatedAt: new Date().toLocaleString(),
        },
        {
          where: {
            artwork_id: id,
          },
        }
      );
    }
    const response = await this.publishVideo(
      AUTH_OBJ,
      result[0].dataValues.file_url,
      result[0].dataValues.name
    );
    if (response.status === 200) {
      await youtubePubished.update(
        {
          publish_status: 'published',
          updatedAt: new Date().toLocaleString(),
          video_id: response.data.id,
        },
        {
          where: {
            artwork_id: id,
          },
        }
      );
    }
    if (response.status === 400) {
      await youtubePubished.update(
        {
          publish_status: 'failed',
          updatedAt: new Date().toLocaleString(),
        },
        {
          where: {
            artwork_id: id,
          },
        }
      );
    }
    return response;
  }
}

export default new NftsService(UserNfts);
