const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class PlatformUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  PlatformUsers.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        autoIncrement: true,
      },
      public_address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      created_on: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      is_enabled: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      profile_photo: {
        type: DataTypes.STRING,
      },
      cover_photo: {
        type: DataTypes.STRING,
      },
      about_me: {
        type: DataTypes.STRING,
      },
      facebook_handle: {
        type: DataTypes.STRING,
      },
      instagram_handle: {
        type: DataTypes.STRING,
      },
      youtube_handle: {
        type: DataTypes.STRING,
      },
      twitter_handle: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      is_profile_complete: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'platform_users',
    }
  );

  PlatformUsers.addHook('beforeSave', async (user) => (user.id = uuid()));

  return PlatformUsers;
};
