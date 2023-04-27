import SellerService from './seller.service';
import { handleResponse } from '../../helpers';

class SellersController {
  constructor(service) {
    this.service = service;
    this.getTrendingSellers = this.getTrendingSellers.bind(this);
    this.getSellers = this.getSellers.bind(this);
  }

  async getSellers(req, res, next) {
    try {
      const result = await this.service.getSellers(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingSellers(req, res, next) {
    try {
      console.log('*****');
      const result = await this.service.getTrendingSellers(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new SellersController(SellerService);
