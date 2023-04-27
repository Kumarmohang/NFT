'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class ExternalSmartContracts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExternalSmartContracts.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      smart_contract_address: {
        type: DataTypes.STRING,
      },
      address_type: {
        type: DataTypes.STRING,
      },
      blockchain_technology: {
        type: DataTypes.STRING,
      },
      asset_name: {
        type: DataTypes.STRING,
      },
      asset_symbol: {
        type: DataTypes.STRING,
      },
      added_by: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'external_smart_contracts',
    }
  );
  ExternalSmartContracts.addHook(
    'beforeSave',
    async (externalSmartContracts) => (externalSmartContracts.id = uuid())
  );
  return ExternalSmartContracts;
};
