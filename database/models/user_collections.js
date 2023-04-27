// 'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class UserCollections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCollections.belongsTo(models.platform_users, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      models.platform_users.hasMany(UserCollections, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    }
  }
  UserCollections.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      logo_url: {
        type: DataTypes.STRING,
      },
      cover_photo_url: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      public_address: {
        type: DataTypes.STRING,
      },
      no_of_likes: {
        type: DataTypes.INTEGER,
      },
      no_of_wishlist: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'user_collections',
    }
  );
  UserCollections.addHook('beforeSave', async (userCollections) => (userCollections.id = uuid()));
  return UserCollections;
};
