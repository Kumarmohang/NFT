'use strict';
const {
  Model
} = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class CollectionLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CollectionLikes.belongsTo(models.user_collections, {foreignKey: 'collection_id', sourceKey: 'id'})
      models.user_collections.hasMany(CollectionLikes, {foreignKey: 'collection_id', sourceKey: 'id'})

      CollectionLikes.belongsTo(models.platform_users, {foreignKey: 'user_id', sourceKey: 'id'})
      models.platform_users.hasMany(CollectionLikes, {foreignKey: 'user_id', sourceKey: 'id'})
    }
  }
  CollectionLikes.init({
    collection_id: {
      type: DataTypes.UUID,
    },
    user_public_key : {
      type : DataTypes.STRING
    },
    user_id : {
      type: DataTypes.UUID,
    },
    is_enabled : {
      type : DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'collection_likes',
  });
  CollectionLikes.addHook('beforeSave', async (like) => (like.id = uuid()));
  return CollectionLikes;
};