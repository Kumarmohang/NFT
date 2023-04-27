const { Sequelize } = require('sequelize');
const moment = require('moment');
// const MarketplaceTransactions =
//   require('../../../database/models').marketplace_transactions;
const PlatformUsers = require('../../../database/models').platform_users;
// const MasterTypes = require('../../../database/models').master_types;
// const ArtworkThemes = require('../../../database/models').artwork_themes;

class SellerService {
  constructor(model) {
    this._model = model;
    this.getTrendingSellers = this.getTrendingSellers.bind(this);
    this.getSellers = this.getSellers.bind(this);
  }

  async getSellers({ limit, offset }) {
    return this._model.findAndCountAll({
      limit,
      offset,
    });
  }

  async getTrendingSellers({
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
                                    marketplace_transactions.seller_id = platform_users.id
                                    AND 'marketplace_transactions.marketplace_buy_end_time' > '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                                    AND marketplace_transactions.status = 'success'
                            )`),
              'value_of_transactions',
            ],
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM user_artworks WHERE
                                user_artworks.user_id = platform_users.id
                            )`),
              'no_of_artworks_created',
            ],
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM nft_lists WHERE
                                nft_lists.current_owner_id = platform_users.id
                            )`),
              'no_of_artworks_currently_owned',
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
                                    marketplace_transactions.seller_id = platform_users.id
                                    AND 'marketplace_transactions.marketplace_buy_end_time' > '${moment()
                                      .subtract(duration, durationUnit)
                                      .utc()
                                      .format('YYYY-MM-DD HH:mm:ss')}'
                                    AND marketplace_transactions.status = 'complete'
                            )`),
              'count_of_transactions',
            ],
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM user_artworks WHERE
                                user_artworks.user_id = platform_users.id
                            )`),
              'no_of_artworks_created',
            ],
            [
              Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM nft_lists WHERE
                                nft_lists.current_owner_id = platform_users.id
                            )`),
              'no_of_artworks_currently_owned',
            ],
          ],
        },
        order: [[Sequelize.col('count_of_transactions'), 'DESC']],
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
}

export default new SellerService(PlatformUsers);
