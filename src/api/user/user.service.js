/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { sequelize } from '../../../database/models';

// const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const MarketplaceTransactions =
  require('../../../database/models').marketplace_transactions;
const MarketplaceSellOrders =
  require('../../../database/models').marketplace_sell_orders;
const UserNfts = require('../../../database/models').user_artworks;
const { refreshSign } = require('../../services/jwt');
// const { Sequelize } = require('sequelize');
const User = require('../../../database/models').platform_users;
const UserSessions = require('../../../database/models').user_session;
const NftLists = require('../../../database/models').nft_lists;
const DecentralandNftLists =
  require('../../../database/models').decentraland_nft_lists;
// const UserArtworks = require('../../../database/models').user_artworks;
const UserCollections = require('../../../database/models').user_collections;
const {
  addImageUrl1,
  appendImageUrl,
  sortArray,
} = require('../../helpers/utils');

class UserService {
  constructor(model) {
    this._model = model;
    this.getUser = this.getUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.userHistory = this.userHistory.bind(this);
    this.logout = this.logout.bind(this);
    this.getOwnedNft = this.getOwnedNft.bind(this);
    this.getCollections = this.getCollections.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  addAssetType = (results, type = 'external') => {
    const transformedData = results.rows.map((item) => {
      const rowItem = { ...item };
      if (type === 'external') {
        rowItem.dataValues.assetType = 'external';
      } else {
        rowItem.dataValues.assetType = 'internal';
      }
      return rowItem.dataValues;
    });
    results.rows = transformedData;
    return results;
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

  async getUser({ userId }) {
    console.log(userId);
    const result = await User.findOne({
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM user_artworks WHERE user_id = '${userId}')`
            ),
            'artwork_count',
          ],
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM user_collections WHERE user_id = '${userId}')`
            ),
            'collection_count',
          ],
        ],
      },
      where: {
        id: userId,
      },
      raw: true,
    });
    console.log(result);
    // result = addImageUrl1(result, ['cover_photo', 'profile_photo']);
    return result;
  }

  async basicDetails(userId) {
    return User.findByPk(userId);
  }

  async createUser(publicAddress) {
    return User.create({
      public_address: publicAddress,
      created_on: new Date(),
      createdOn: new Date(),
      updatedOn: new Date(),
      is_enabled: false,
    });
  }

  async createUserSession(publicAddress, userId) {
    console.log({ publicAddress });
    const expiresIn = process.env.JWT_REFRESH_EXPIRES;
    const expiryDate = new Date();
    expiryDate.setDate(
      expiryDate.getDate() + parseInt(expiresIn.match(/\d+/g), 10)
    );
    const jwtToken = await refreshSign({
      sub: userId,
    });
    return UserSessions.create({
      user_id: userId,
      session_tokens: jwtToken,
      expiry_time: expiryDate,
    });
  }

  async loginUser({ publicAddress }) {
    publicAddress = publicAddress.toLowerCase();
    const user = await User.findOne({
      where: { public_address: publicAddress },
    });
    if (!user) {
      const newUser = await this.createUser(publicAddress);
      const userSession = await this.createUserSession(
        publicAddress,
        newUser.id
      );
      const jwtToken = userSession.session_tokens;
      const userNew = newUser.get({ plain: true });
      return { user: userNew, jwtToken, first_login: true };
    }
    const sessionResult = await UserSessions.findOne({
      where: { user_id: user.id },
      raw: true,
    });
    const isExpired = sessionResult.expiry_time - new Date() < 0;
    if (!sessionResult || isExpired) {
      const userSession = await this.createUserSession(publicAddress, user.id);
      const jwtToken = userSession.session_tokens;
      return { user, jwtToken, first_login: false };
    }
    return { user, jwtToken: sessionResult.session_tokens, first_login: false };
  }

  async editUser(req) {
    const res = { status: 'Nothing updated' };
    const {
      nickname,
      aboutMe,
      facebookHandle,
      instagramHandle,
      youtubeHandle,
      twitterHandle,
      email,
    } = req.body;

    const { id: userId } = req.user.userDetails;

    const updateObj = {};

    if (nickname) {
      updateObj.nickname = nickname;
    }
    if (aboutMe) {
      updateObj.about_me = aboutMe;
    }
    if (facebookHandle) {
      updateObj.facebook_handle = facebookHandle;
    }
    if (instagramHandle) {
      updateObj.instagram_handle = instagramHandle;
    }
    if (youtubeHandle) {
      updateObj.youtube_handle = youtubeHandle;
    }
    if (twitterHandle) {
      updateObj.twitter_handle = twitterHandle;
    }
    if (email) {
      updateObj.email = email;
    }

    console.log('****** ', req.files);
    if (req.files) {
      const { files } = req;
      if (files.profile_photo && files.profile_photo.length > 0) {
        updateObj.profile_photo = appendImageUrl(
          files.profile_photo[0].originalname
        );
      }
      if (files.cover_photo && files.cover_photo.length > 0) {
        updateObj.cover_photo = appendImageUrl(
          files.cover_photo[0].originalname
        );
      }
    }
    if (updateObj.nickname && updateObj.profile_photo.length > 0) {
      updateObj.is_profile_complete = true;
    }

    if (updateObj) {
      const result = await User.update(updateObj, {
        where: {
          id: userId,
        },
      });
      res.status = 'Profile Updated';
      // res.result = result;
    }
    const userDetails = await User.findByPk(userId);
    res.user = userDetails;
    return res;
  }

  async userHistory(req) {
    const userId = req.params.id;
    const { artwork_id: artworkId, limit, offset } = req.query;

    const whereArtworkIdvalues = {};
    const whereUserIdvalues = [];

    if (artworkId) {
      whereArtworkIdvalues.id = artworkId;
    }

    if (userId) {
      whereUserIdvalues.push({ buyer_id: userId });
      whereUserIdvalues.push({ seller_id: userId });
    }

    let MarketplaceTransactionsResult =
      await MarketplaceTransactions.findAndCountAll({
        limit,
        offset,
        where: {
          ...whereArtworkIdvalues,
          [Op.or]: whereUserIdvalues,
        },
        include: [
          {
            model: NftLists,
          },
          {
            model: User,
            as: 'buyer',
          },
          {
            model: User,
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
        // ...whereArtworkIdvalues,
        [Op.or]: [{ seller_id: userId }],
      },
      include: [
        {
          model: NftLists,
        },
        {
          model: User,
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

  async logout({ userDetails }) {
    const result = await UserSessions.destroy({
      where: {
        user_id: userDetails.id,
      },
    });
    if (result) {
      return { status: true };
    }
    return false;
  }

  async getOwnedNft({ userId, limit = 100, offset = 0 }) {
    let result = await NftLists.findAndCountAll({
      limit,
      offset,
      where: {
        current_owner_id: userId,
      },
      include: [
        {
          model: User,
          required: false,
          as: 'creator',
        },
        {
          model: User,
          required: false,
          as: 'current_owner',
        },
      ],
    });

    result = this.addAssetType(result, 'internal');

    let decentralandNftResult = await DecentralandNftLists.findAndCountAll({
      limit,
      offset,
      where: {
        current_owner_id: userId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    console.log(decentralandNftResult);
    const processedResult = [];
    // console.log(result);
    processedResult.rows = [...result.rows];
    if (decentralandNftResult.rows.count !== 0) {
      decentralandNftResult = this.addAssetType(
        decentralandNftResult,
        'external'
      );
      // processedResult.rows = [...result.rows];
      processedResult.rows.push(...decentralandNftResult.rows);
      // result.rows = decentralandNftResult.rows;
    }

    console.log(processedResult);
    // result = addImageUrl1(result, ['cover_photo', 'profile_photo']);

    return processedResult;
  }

  async getCollections({ userId, limit = 10, offset = 0 }) {
    return UserCollections.findAndCountAll({
      limit,
      offset,
      where: {
        user_id: userId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
  }

  async getAllUsers({ limit = 10, offset = 0, search }) {
    let whereSearch = {};
    if (search) {
      whereSearch = {
        where: {
          nickname: {
            [Op.iLike]: `%${search}%`,
          },
        },
      };
    }

    return this._model.findAndCountAll({
      limit,
      offset,
      ...whereSearch,
    });
  }
}

export default new UserService(User);
