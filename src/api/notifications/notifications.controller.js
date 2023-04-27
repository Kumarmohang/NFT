import NotificationsService from './notifications.service';
import { handleResponse } from '../../helpers';

class NotficationsController {
  constructor(service) {
    this.service = service;
    this.getNotifications = this.getNotifications.bind(this);
    this.createNotifications = this.createNotifications.bind(this);
  }

  async getNotifications(req, res, next) {
    try {
      const result = await this.service.getNotifications(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async createNotifications(req, res, next) {
    try {
      const result = await this.service.createNotifications(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

// count api

export default new NotficationsController(NotificationsService);
