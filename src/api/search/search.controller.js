import SearchService from './search.service';
import { handleResponse } from '../../helpers';

class SearchController {
  constructor(service) {
    this.service = service;
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  async getSearchResults(req, res, next) {
    try {
      // console.log('*****');
      const result = await this.service.getSearchResults(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new SearchController(SearchService);
