import LandingPageStatsService from './landingPageStats.service';
import { handleResponse } from '../../helpers';

class LandingPageStatsController {
  constructor(service) {
    this.service = service;
    this.getTopStats = this.getTopStats.bind(this);
  }

  async getTopStats(req, res, next) {
    try {
      const result = await this.service.getTopStats();
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new LandingPageStatsController(LandingPageStatsService);
