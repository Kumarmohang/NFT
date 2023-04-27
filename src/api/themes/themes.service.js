const MasterThemes = require('../../../database/models').master_themes;

class ThemesService {
  constructor(model) {
    this._model = model;
    this.getThemes = this.getThemes.bind(this);
  }

  getThemes() {
    return this._model.findAndCountAll();
  }
}

export default new ThemesService(MasterThemes);
