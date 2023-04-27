const ArtworkTypes = require('../../../database/models').master_types;

class ArtworkTypesService {
  constructor(model) {
    this._model = model;
    this.getTypes = this.getTypes.bind(this);
  }

  async getTypes() {
    return this._model.findAndCountAll();
  }
}

export default new ArtworkTypesService(ArtworkTypes);
