const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class ConfigStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  ConfigStore.init(
    {
      artwork_type_id: {
        type: DataTypes.UUID,
      },
      commision: {
        type: DataTypes.DECIMAL,
      },
      type: {
        type: DataTypes.STRING,
      },
      currency: {
        type: DataTypes.STRING,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'config_store',
    }
  );
  ConfigStore.addHook(
    'beforeSave',
    async (configStore) => (configStore.id = uuid())
  );
  return ConfigStore;
};
