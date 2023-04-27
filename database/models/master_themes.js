const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class MasterThemes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  MasterThemes.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'master_themes',
    }
  );
  MasterThemes.addHook(
    'beforeSave',
    async (masterThemes) => (masterThemes.id = uuid())
  );
  return MasterThemes;
};
