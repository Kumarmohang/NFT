import CollectionsService from './collections.service';
import { handleResponse } from '../../helpers';

class CollectionsController {
  constructor(service) {
    this.service = service;
    this.getCollections = this.getCollections.bind(this);
    this.createCollections = this.createCollections.bind(this);
    this.editCollections = this.editCollections.bind(this);
    this.getTrendingCollections = this.getTrendingCollections.bind(this);
    this.toggleCollectionLike = this.toggleCollectionLike.bind(this);
    this.collectionDetails = this.collectionDetails.bind(this);
  }

  async getCollections(req, res, next) {
    try {
      const result = await this.service.getCollections(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async createCollections(req, res, next) {
    try {
      const result = await this.service.createCollections(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async editCollections(req, res, next) {
    try {
      const result = await this.service.editCollections(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingCollections(req, res, next) {
    try {
      const result = await this.service.getTrendingCollections(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async toggleCollectionLike(req, res, next) {
    try {
      const result = await this.service.toggleCollectionLike(req);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async collectionDetails(req, res, next) {
    try {
      const result = await this.service.collectionDetails(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new CollectionsController(CollectionsService);
