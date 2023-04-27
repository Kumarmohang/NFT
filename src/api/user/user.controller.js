import UserService from './user.service';
import { handleResponse } from '../../helpers';

class UserController {
  constructor(service) {
    this.service = service;
    this.getUser = this.getUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.userHistory = this.userHistory.bind(this);
    this.jwtUser = this.jwtUser.bind(this);
    this.logout = this.logout.bind(this);
    this.getOwnedNft = this.getOwnedNft.bind(this);
    this.getCollections = this.getCollections.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async getAllUsers(req, res, next) {
    try {
      const result = await this.service.getAllUsers(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const result = await this.service.getUser(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async loginUser(req, res, next) {
    try {
      console.log('******* login user', req.body);
      const result = await this.service.loginUser(req.body);
      return handleResponse.success(res, result);
    } catch (error) {
      console.trace(error);
      next(error);
    }
  }

  async jwtUser(req, res, next) {
    try {
      console.log('******* login user', req.user);
      // const result = await this.service.basicDetails(req.user);
      return handleResponse.success(res, req.user);
    } catch (error) {
      next(error);
    }
  }

  async editUser(req, res, next) {
    try {
      const result = await this.service.editUser(req);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async userHistory(req, res, next) {
    try {
      const result = await this.service.userHistory(req);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const result = await this.service.logout(req.user);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getOwnedNft(req, res, next) {
    try {
      const result = await this.service.getOwnedNft(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getCollections(req, res, next) {
    try {
      const result = await this.service.getCollections(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController(UserService);
