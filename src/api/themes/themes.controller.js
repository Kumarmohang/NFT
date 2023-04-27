import ThemesService from './themes.service';
import { handleResponse } from '../../helpers';

class ThemesController {
  constructor(service) {
    this.service = service;
    this.getThemes = this.getThemes.bind(this);
  }

  async getThemes(req, res, next) {
    try {
      const result = await this.service.getThemes();
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThemesController(ThemesService);
