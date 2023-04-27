import WalletService from './walletExtension.service';
import { handleResponse } from '../../helpers';

class TypesController {
  constructor(service) {
    this.service = service;
    this.getWallet = this.getWallet.bind(this);
  }

  async getTypes(req, res, next) {
    try {
      const result = await this.service.getWallet();
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TypesController(WalletService);
