import TypesService from './types.service';
import { handleResponse } from '../../helpers';

class TypesController {
  constructor(service) {
    this.service = service;
    this.getTypes = this.getTypes.bind(this);
  }

  async getTypes(req, res, next) {
    try {
      const result = await this.service.getTypes();
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TypesController(TypesService);
