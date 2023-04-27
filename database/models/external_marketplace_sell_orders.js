'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class ExternalMarketplaceSellOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ExternalMarketplaceSellOrders.belongsTo(models.platform_users, {
        foreignKey: 'seller_id',
        targetKey: 'id',
      });
      models.platform_users.hasMany(ExternalMarketplaceSellOrders, {
        foreignKey: 'seller_id',
        sourceKey: 'id',
      });

      ExternalMarketplaceSellOrders.belongsTo(models.decentraland_nft_lists, {
        foreignKey: 'nft_id',
        targetKey: 'id',
      });
      models.decentraland_nft_lists.hasMany(ExternalMarketplaceSellOrders, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });
    }
  }
  ExternalMarketplaceSellOrders.init(
    {
      nft_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      seller_public_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marketplace_publish_datetime: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
        values: ['active', 'cancelled', 'complete', 'failed'],
        allowNull: false,
      },
      status_reason: {
        type: DataTypes.STRING,
      },
      txn_value: {
        type: DataTypes.DOUBLE,
      },
      txn_symbol: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'external_marketplace_sell_orders',
    }
  );
  ExternalMarketplaceSellOrders.addHook(
    'beforeSave',
    async (externalMarketplaceSellOrders) => (externalMarketplaceSellOrders.id = uuid()));
  return ExternalMarketplaceSellOrders;
};
