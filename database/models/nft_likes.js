'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
const UserArtworks = require('.').user_artworks;
module.exports = (sequelize, DataTypes) => {
  class UserLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserLikes.belongsToMany(models.user_artworks, {through: 'user_likes_user_artworks', targetKey: 'title'})
      UserLikes.belongsTo(models.nft_lists, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });
      models.nft_lists.hasMany(UserLikes, {
        foreignKey: 'nft_id',
        sourceKey: 'id',
      });

      UserLikes.belongsTo(models.platform_users, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
      models.platform_users.hasMany(UserLikes, {
        foreignKey: 'user_id',
        sourceKey: 'id',
      });
    }
  }
  UserLikes.init(
    {
      nft_id: {
        type: DataTypes.UUID,
        //   references: {
        //     model: 'user_artworks', // 'fathers' refers to table name
        //     key: 'id', // 'id' refers to column name in fathers table
        //  }
      },
      user_public_key: {
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.UUID,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'nft_likes',
    }
  );
  UserLikes.addHook(
    'beforeSave',
    async (userLikes) => (userLikes.id = uuid())
  );  
  return UserLikes;
};
