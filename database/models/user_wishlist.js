'use strict';
const {
  Model
} = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class UserWhislist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserWhislist.init({
    artwork_id: {
      type: DataTypes.UUID
    },
    user_public_key : {
      type : DataTypes.STRING
    },
    user_id : {
      type : DataTypes.UUID
    },
    is_enabled : {
      type : DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'user_wishlist',
  });
  UserWhislist.addHook('beforeSave', async (userWhislist) => (userWhislist.id = uuid()));
  return UserWhislist;
};