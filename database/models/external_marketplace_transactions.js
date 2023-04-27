'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class ExternalMarketplaceTransactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ExternalMarketplaceTransactions.belongsTo(models.decentraland_nft_lists, {
        foreignKey: 'nft_id',
        targetKey: 'id',
      });
      models.decentraland_nft_lists.hasMany(ExternalMarketplaceTransactions, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });

      ExternalMarketplaceTransactions.belongsTo(models.platform_users, {
        foreignKey: 'buyer_id',
        targetKey: 'id',
        as: 'buyer',
      });
      models.platform_users.hasMany(ExternalMarketplaceTransactions, {
        foreignKey: 'buyer_id',
        sourceKey: 'id',
      });

      ExternalMarketplaceTransactions.belongsTo(models.platform_users, {
        foreignKey: 'seller_id',
        targetKey: 'id',
        as: 'seller',
      });
      models.platform_users.hasMany(ExternalMarketplaceTransactions, {
        foreignKey: 'seller_id',
        sourceKey: 'id',
      });
    }
  }
  ExternalMarketplaceTransactions.init(
    {
      nft_id: {
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
        type: DataTypes.INTEGER,
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
    },
    {
      sequelize,
      modelName: 'external_marketplace_transactions',
    }
  );
  ExternalMarketplaceTransactions.addHook(
    'beforeSave',
    async (externalMarketplaceTransactions) => (externalMarketplaceTransactions.id = uuid())
  );
  return ExternalMarketplaceTransactions;
};
