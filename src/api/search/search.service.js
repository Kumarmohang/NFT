const { Op } = require('sequelize');
const PlatformUsers = require('../../../database/models').platform_users;
// const UserArtworks = require('../../../database/models').user_artworks;
const NftLists = require('../../../database/models').nft_lists;
const UserCollections = require('../../../database/models').user_collections;

class SearchService {
  constructor(model) {
    this._model = model;
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  async getSearchResults({ keyword, offset = 0, limit = 10 }) {
    // const { offset = 0, limit = 0 } = query;
    console.log(keyword);
    // keyword = keyword.toLowerCase();

    const collectionResults = await UserCollections.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      attributes: ['id', 'name', 'logo_url'],
      offset,
      limit,
    });
    // console.log(collectionResults);

    const userResults = await this._model.findAndCountAll({
      where: {
        nickname: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      attributes: ['id', ['nickname', 'name'], ['profile_photo', 'logo_url']],
      offset,
      limit,
    });

    // console.log(userResults);

    const artworkResults = await NftLists.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${keyword}%`,
        },
      },
      attributes: ['id', 'name', 'file_url', 'thumbnail_url'],
      offset,
      limit,
    });
    // console.log(artworkResults);

    const result = {};
    result.count = limit;
    // result.rows = [
    //   ...collectionResults.rows,
    //   ...userResults.rows,
    //   ...artworkResults.rows,
    // ];

    result.rows = [
      {
        collections: collectionResults.rows,
      },
      {
        users: userResults.rows,
      },
      {
        artworks: artworkResults.rows,
      },
    ];

    // console.log(result);
    return result;
    // throw Error('This is a error');
  }
}

export default new SearchService(PlatformUsers);
