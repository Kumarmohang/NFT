const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class ArtworkThemes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ArtworkThemes.belongsTo(models.nft_lists, {
        foreignKey: 'nft_id',
        targetKey: 'id',
      });
      models.nft_lists.hasMany(ArtworkThemes, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });
      ArtworkThemes.belongsTo(models.master_themes, {
        foreignKey: 'theme_id',
        sourceKey: 'id',
      });
    }
  }
  ArtworkThemes.init(
    {
      nft_id: {
        type: DataTypes.UUID,
        allowNull: null,
      },
      theme_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'artwork_themes',
    }
  );
  ArtworkThemes.addHook('beforeSave', async (theme) => (theme.id = uuid()));
  return ArtworkThemes;
};
