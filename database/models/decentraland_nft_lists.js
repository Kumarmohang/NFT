const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class DecentralandNftLists extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DecentralandNftLists.belongsTo(models.master_types, {
        foreignKey: 'type_id',
        targetKey: 'id',
      });
      models.master_types.hasMany(DecentralandNftLists, {
        foreignKey: 'type_id',
        sourceKey: 'id',
      });

      DecentralandNftLists.belongsTo(models.platform_users, {
        foreignKey: 'current_owner_id',
        targetKey: 'id',
      });
      models.platform_users.hasMany(DecentralandNftLists, {
        foreignKey: 'current_owner_id',
        sourceKey: 'id',
      });
    }
  }
  DecentralandNftLists.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      token_id: {
        type: DataTypes.STRING,
      },
      type_id: {
        type: DataTypes.UUID,
      },
      description: {
        type: DataTypes.TEXT,
      },
      external_link: {
        type: DataTypes.STRING,
      },
      file_url: {
        type: DataTypes.STRING,
      },
      smart_contract_address: {
        type: DataTypes.STRING,
      },
      current_owner_public_key: {
        type: DataTypes.STRING,
      },
      current_owner_id: {
        type: DataTypes.UUID,
      },
      network_type: {
        type: DataTypes.STRING,
      },
      network_id: {
        type: DataTypes.STRING,
      },
      network_name: {
        type: DataTypes.STRING,
      },
      is_land: {
        type: DataTypes.BOOLEAN,
      },
      attributes: {
        type: DataTypes.TEXT,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'decentraland_nft_lists',
    }
  );
  DecentralandNftLists.addHook(
    'beforeSave',
    async (decentralandNftLists) => (decentralandNftLists.id = uuid()));
  return DecentralandNftLists;
};
