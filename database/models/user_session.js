const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserSession.belongsTo(models.platform_users, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
      // models.platform_users.hasMany(UserSession, {foreignKey: 'platform_users', sourceKey: 'id'})
    }
  }
  UserSession.init(
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      session_tokens: {
        type: DataTypes.STRING,
      },
      expiry_time: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'user_session',
    }
  );
  UserSession.addHook('beforeSave', async (user) => (user.id = uuid()));
  return UserSession;
};
