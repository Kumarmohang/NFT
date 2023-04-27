// 'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class MarketplaceSellOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarketplaceSellOrders.belongsTo(models.user_artworks, {
        foreignKey: 'artwork_id',
        targetKey: 'id',
      });
      models.user_artworks.hasMany(MarketplaceSellOrders, {
        foreignKey: 'artwork_id',
        sourceKey: 'id',
      });

      MarketplaceSellOrders.belongsTo(models.platform_users, {
        foreignKey: 'seller_id',
        targetKey: 'id',
        as: 'seller',
      });
      models.platform_users.hasMany(MarketplaceSellOrders, {
        foreignKey: 'seller_id',
        sourceKey: 'id',
      });

      MarketplaceSellOrders.belongsTo(models.nft_lists, {
        foreignKey: 'nft_id',
        targetKey: 'id',
      });
      models.nft_lists.hasMany(MarketplaceSellOrders, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });
      MarketplaceSellOrders.belongsTo(models.user_collections, {
        foreignKey: 'collection_id',
        targetKey: 'id',
      });
    }
  }
  MarketplaceSellOrders.init(
    {
      nft_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      artwork_id: {
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
      collection_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      txn_hash: {
        type: DataTypes.STRING,
      },
      nonce: {
        type: DataTypes.STRING,
      },
      signature: {
        type: DataTypes.STRING,
      },
      marketplace_fees: {
        type: DataTypes.INTEGER,
      },
      marketplace_fees_recipient: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'marketplace_sell_orders',
    }
  );
  MarketplaceSellOrders.addHook(
    'beforeSave',
    async (marketplaceSellOrders) => (marketplaceSellOrders.id = uuid())
  );
  return MarketplaceSellOrders;
};
