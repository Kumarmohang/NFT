const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class CryptoConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  CryptoConfig.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      symbol: {
        type: DataTypes.STRING,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      blockchain_technology: {
        type: DataTypes.STRING,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
      current_rate_usd: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      modelName: 'crypto_config',
    }
  );
  CryptoConfig.addHook(
    'beforeSave',
    async (cryptoConfig) => (cryptoConfig.id = uuid())
  );
  return CryptoConfig;
};
