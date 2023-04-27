const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class AdminUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  AdminUsers.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      is_enabled: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'admin_users',
    }
  );

  AdminUsers.addHook('beforeSave', async (user) => (user.id = uuid()));

  return AdminUsers;
};
