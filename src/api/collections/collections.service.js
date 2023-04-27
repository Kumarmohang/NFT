const { Sequelize, Op } = require('sequelize');
const moment = require('moment');
// const { Sequelize, Op } = require('sequelize');
const UserCollections = require('../../../database/models').user_collections;
const PlatformUsers = require('../../../database/models').platform_users;
const CollectionLikes = require('../../../database/models').collection_likes;
const UserArtworks = require('../../../database/models').user_artworks;

class CollectionsService {
  constructor(model) {
    this._model = model;
    this.getCollections = this.getCollections.bind(this);
    this.createCollections = this.createCollections.bind(this);
    this.editCollections = this.editCollections.bind(this);
    this.getTrendingCollections = this.getTrendingCollections.bind(this);
    this.toggleCollectionLike = this.toggleCollectionLike.bind(this);
    this.collectionDetails = this.collectionDetails.bind(this);
  }

  async getCollections({ user_id: userId, limit, offset, search }) {
    const whereUserId = {};
    if (userId) {
      whereUserId.user_id = userId;
    }
    // if (search) {
    //   whereUserId.search = search;
    // }
    return this._model.findAndCountAll({
      limit,
      offset,
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
          ...whereUserId,
        },
      },
      include: [
        {
          model: PlatformUsers,
          require: true,
        },
      ],
    });
  }

  async createCollections(req) {
    const {
      name,
      description = '',
      // logoUrl,
      // bannerUrl = '',
      // publicAddress = '',
      // userId,
    } = req.body;

    const existingArtwork = await UserCollections.findOne({
      where: {
        name,
      },
    });
    if (!existingArtwork) {
      const {
        files,
        user_id: userId = 1,
        public_address: publicAddress = '',
      } = req;

      const logoUrl = files.logo_file[0].originalname;
      let coverUrl = '';
      if (files.cover_file && files.cover_file.length > 0) {
        coverUrl = files.cover_file[0].originalname;
      }

      return UserCollections.create({
        name,
        description,
        logo_url: logoUrl,
        cover_photo_url: coverUrl,
        public_address: publicAddress,
        user_id: userId,
      });
    }
    throw new Error('Collection name already exists');
  }

  async editCollections(req) {
    const {
      name,
      description,
      // logoUrl, bannerUrl, publicAddress, userId
    } = req.body;

    const {
      files,
      user_id: userId = 1,
      public_address: publicAddress = '',
    } = req;

    const { id } = req.params;
    const res = { status: 'Nothing updated' };
    console.log(name);
    if (name) {
      const result = await UserCollections.update(
        { name },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Collection Updated';
      res.result = result;
    }
    if (description) {
      const result = await UserCollections.update(
        { description },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Collection Updated';
      res.result = result;
    }
    let logoUrl = '';
    if (files.logo_file && files.logo_file.length > 0) {
      logoUrl = files.logo_file[0].originalname;
    }

    if (logoUrl) {
      const result = await UserCollections.update(
        {
          logo_url: logoUrl,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Collection Updated';
      res.result = result;
    }
    let coverUrl = '';
    if (files.cover_file && files.cover_file.length > 0) {
      coverUrl = files.cover_file[0].originalname;
    }
    if (coverUrl) {
      const result = await UserCollections.update(
        {
          cover_photo_url: coverUrl,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Collection Updated';
      res.result = result;
    }
    if (publicAddress) {
      const result = await UserCollections.update(
        {
          public_address: publicAddress,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Collection Updated';
      res.result = result;
    }
    if (userId) {
      // const collectionId = await ArtworkCollection.findOne({
      //   where: {
      //     name: collectionName, //need to check if userId exists or not
      //   },
      //   attributes: ['id'],
      // });
      const result = await UserCollections.update(
        {
          user_id: userId,
        },
        {
          where: {
            id,
          },
        }
      );
      res.status = 'Collection Updated';
      res.result = result;
    }
    console.log(res);
    return res;
  }

  async getTrendingCollections({
    aggregate_by: aggregateBy,
    duration,
    duration_unit: durationUnit,
    type,
    theme,
    limit,
    offset,
  }) {
    // const { offset = 0, limit = 0 } = query;

    let result = {};

    const whereType = {};
    const whereTheme = {};
    if (type) {
      whereType.id = type;
    }
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
                                FROM collection_likes WHERE
                                    collection_likes.collection_id = user_collections.id
                                    AND 'collection_likes.createdAt' > '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                                    AND collection_likes.is_enabled = true
                            )`),
              'count_likes',
            ],
          ],
        },
        order: [[Sequelize.col('count_likes'), 'DESC']],
        include: [
          {
            model: PlatformUsers,
            require: true,
          },
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
        ],
      });
    }

    if (aggregateBy === 'value_of_transactions') {
      result = await this._model.findAndCountAll({
        limit,
        offset,
        attributes: {
          include: [
            [
              Sequelize.literal(`(
                                SELECT COALESCE(SUM(txn_value),0)
                                FROM marketplace_transactions WHERE
                                    marketplace_transactions.collection_id = user_collections.id
                                    AND 'marketplace_transactions.createdAt' > '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                                    AND marketplace_transactions.status = 'success'
                            )`),
              'value_of_transactions',
            ],
          ],
        },
        order: [[Sequelize.col('value_of_transactions'), 'DESC']],
        include: [
          {
            model: PlatformUsers,
            require: true,
          },
          //   {
          //     model: MasterTypes,
          //     require: true,
          //     where: {
          //       ...whereType,
          //     },
          //   },
          //   {
          //     model: ArtworkThemes,
          //     require: true,
          //     where: {
          //       ...whereTheme,
          //     },
          //   },
        ],
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
        // include: [
        //   {
        //     model: PlatformUsers,
        //     require: true,
        //   },
        //   {
        //     model: MasterTypes,
        //     require: true,
        //     where: {
        //       ...whereType,
        //     },
        //   },
        //   {
        //     model: ArtworkThemes,
        //     require: true,
        //     where: {
        //       ...whereTheme,
        //     },
        //   },
        // ],
      });
    }

    console.log(result);
    return result;
  }

  async toggleCollectionLike(req) {
    const collectionId = req.params.id;
    const { isLike, user_id: userId } = req.query;

    const collectionLikeRecord = await CollectionLikes.findOne({
      where: {
        user_id: userId,
        artwork_id: collectionId,
      },
    });

    let result;
    console.log(isLike);
    if (isLike === 'true') {
      // check if record already exist
      if (!collectionLikeRecord) {
        // add new record
        result = await CollectionLikes.create({
          artwork_id: collectionId,
          user_id: userId,
          user_public_key: '',
          is_enabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // update the like table
        result = await CollectionLikes.update(
          { is_enabled: true, updatedAt: new Date() },
          {
            where: {
              user_id: userId,
              artwork_id: collectionId,
            },
          }
        );
      }

      // increment the count of user_artworks table
      await this._model.increment('no_of_likes', {
        by: 1,
        where: {
          id: collectionId,
        },
      });
    } else if (isLike === 'false') {
      // check if record already exist else ignore any update
      if (collectionLikeRecord) {
        // update the like table
        result = await CollectionLikes.update(
          { is_enabled: false, updatedAt: new Date() },
          {
            where: {
              user_id: userId,
              artwork_id: collectionId,
            },
          }
        );

        // decrement the count of user artworks table
        await this._model.decrement('no_of_likes', {
          by: 1,
          where: {
            id: collectionId,
          },
        });
      } else {
        // return error that operation is not valid
        console.log('Error');
      }
    }

    console.log(result);
    return result;
  }

  async collectionDetails(req) {
    const collectionId = req.params.id;

    // get total artworks count
    const artworksCount = await UserArtworks.count({
      where: {
        collection_id: collectionId,
      },
    });

    // get total volume of transactions of a collection

    const result = await this._model.findOne({
      where: {
        id: collectionId,
      },
    });

    if (result) {
      result.dataValues.artworks_count = artworksCount;
    }

    console.log(result);
    return result;
  }
}

export default new CollectionsService(UserCollections);
