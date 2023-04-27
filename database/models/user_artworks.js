const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

const userArtWork = (sequelize, DataTypes) => {
  class UserArtworks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserArtworks.hasMany(models.user_likes, {foreignKey: 'artwork_id', sourceKey: 'id'})
      UserArtworks.belongsTo(models.platform_users, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      models.platform_users.hasMany(UserArtworks, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });

      UserArtworks.belongsTo(models.master_types, {
        foreignKey: 'type_id',
        targetKey: 'id',
      });
      models.master_types.hasMany(UserArtworks, {
        foreignKey: 'type_id',
        sourceKey: 'id',
      });

      UserArtworks.belongsTo(models.user_collections, {
        foreignKey: 'collection_id',
        targetKey: 'id',
      });
    }
  }
  UserArtworks.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      external_link: {
        type: DataTypes.STRING,
      },
      file_url: {
        type: DataTypes.STRING,
      },
      content_type: {
        type: DataTypes.STRING,
      },
      thumbnail_url: {
        type: DataTypes.STRING,
      },
      collection_id: {
        type: DataTypes.UUID,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
      no_of_likes: {
        type: DataTypes.INTEGER,
      },
      no_of_wishlist: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      creator_public_address: {
        type: DataTypes.STRING,
      },
      smart_contract_address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'user_artworks',
    }
  );
  UserArtworks.addHook('beforeSave', async (userArtworks) => (userArtworks.id = uuid()));
  return UserArtworks;
};

module.exports = userArtWork;
