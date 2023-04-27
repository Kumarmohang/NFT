const MasterTypes = require('../../../database/models').master_types;

class TypesService {
  constructor(model) {
    this._model = model;
    this.getTypes = this.getTypes.bind(this);
  }

  getTypes() {
    return this._model.findAndCountAll();
  }
}

export default new TypesService(MasterTypes);
