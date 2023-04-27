'use strict';
const {
  Model
} = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class WalletExtensions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WalletExtensions.init({
    name: {
      type: DataTypes.STRING
    },
    identifier: {
      type: DataTypes.STRING
    },
    image_url: {
      type: DataTypes.STRING
    },
    is_popular: {
      type: DataTypes.BOOLEAN
    },
    is_enabled: {
      type: DataTypes.BOOLEAN
    },
    order: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'wallet_extensions',
  });
  WalletExtensions.addHook('beforeSave', async (walletExtensions) => (walletExtensions.id = uuid()));
  return WalletExtensions;
};