const WalletExtension = require('../../../database/models').wallet_extensions;

class TypesService {
  constructor(model) {
    this._model = model;
    this.getTypes = this.getWallet.bind(this);
  }

  getWallet() {
    return this._model.findAndCountAll();
  }
}

export default new TypesService(WalletExtension);
