// 'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class LandingPageStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  LandingPageStats.init(
    {
      artworks_count: {
        type: DataTypes.INTEGER,
      },
      auctions_count: {
        type: DataTypes.INTEGER,
      },
      artist_count: {
        type: DataTypes.INTEGER,
      },
      total_transactions_count: {
        type: DataTypes.INTEGER,
      },
      collections_count: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'landing_page_stats',
    }
  );
  LandingPageStats.addHook(
    'beforeSave',
    async (landingPageStat) => (landingPageStat.id = uuid())
  );
  return LandingPageStats;
};
