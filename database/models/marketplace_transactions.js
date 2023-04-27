'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class MarketplaceTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MarketplaceTransactions.belongsTo(models.user_artworks, {
        foreignKey: 'artwork_id',
        targetKey: 'id',
      });
      models.user_artworks.hasMany(MarketplaceTransactions, {
        foreignKey: 'artwork_id',
        sourceKey: 'id',
      });

      MarketplaceTransactions.belongsTo(models.nft_lists, {
        foreignKey: 'nft_id',
        targetKey: 'id',
      });
      models.nft_lists.hasMany(MarketplaceTransactions, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });

      MarketplaceTransactions.belongsTo(models.platform_users, {
        foreignKey: 'buyer_id',
        targetKey: 'id',
        as: 'buyer',
      });
      models.platform_users.hasMany(MarketplaceTransactions, {
        foreignKey: 'buyer_id',
        sourceKey: 'id',
      });

      MarketplaceTransactions.belongsTo(models.platform_users, {
        foreignKey: 'seller_id',
        targetKey: 'id',
        as: 'seller',
      });
      models.platform_users.hasMany(MarketplaceTransactions, {
        foreignKey: 'seller_id',
        sourceKey: 'id',
      });
      MarketplaceTransactions.belongsTo(models.user_collections, {
        foreignKey: 'collection_id',
        targetKey: 'id',
      });
    }
  }
  MarketplaceTransactions.init(
    {
      nft_id: {
        type: DataTypes.UUID,
      },
      artwork_id: {
        type: DataTypes.UUID,
      },
      buyer_public_key: {
        type: DataTypes.STRING,
      },
      seller_public_key: {
        type: DataTypes.STRING,
      },
      buyer_id: {
        type: DataTypes.UUID,
      },
      seller_id: {
        type: DataTypes.UUID,
      },
      marketplace_buy_init_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      marketplace_buy_end_time: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
      status_reason: {
        type: DataTypes.TEXT,
      },
      marketplace_sell_record_id: {
        type: DataTypes.UUID,
      },
      txn_value: {
        type: DataTypes.DOUBLE,
      },
      txn_symbol: {
        type: DataTypes.STRING,
      },
      blockchain_txn_hash: {
        type: DataTypes.STRING,
      },
      collection_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'marketplace_transactions',
    }
  );
  MarketplaceTransactions.addHook(
    'beforeSave',
    async (marketplaceTransactions) => (marketplaceTransactions.id = uuid())
  );
  return MarketplaceTransactions;
};
