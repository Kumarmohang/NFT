const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class Instagram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Instagram.init(
    {
      artwork_id: {
        type: DataTypes.UUID,
      },
      url: {
        type: DataTypes.STRING,
      },
      channel_name: {
        type: DataTypes.STRING,
      },
      channel_url: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      no_of_likes: {
        type: DataTypes.INTEGER,
      },
      no_of_comments: {
        type: DataTypes.INTEGER,
      },
      publish_status: {
        type: DataTypes.STRING,
      },
      no_of_views: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'instagram',
    }
  );
  Instagram.addHook(
    'beforeSave',
    async (instagram) => (instagram.id = uuid())
  );
  return Instagram;
};
