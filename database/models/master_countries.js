const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

module.exports = (sequelize, DataTypes) => {
  class MasterCountries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  MasterCountries.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'master_countries',
    }
  );
  MasterCountries.addHook(
    'beforeSave',
    async (masterCountries) => (masterCountries.id = uuid())
  );
  return MasterCountries;
};
