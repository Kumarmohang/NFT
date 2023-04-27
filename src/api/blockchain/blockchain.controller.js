import BlockchainService from './blockchain.service';
import { handleResponse } from '../../helpers';

class BlockchainController {
  constructor(service) {
    this.service = service;
    this.getTxnHashStatus = this.getTxnHashStatus.bind(this);
    this.getApprovalForAllStatus = this.getApprovalForAllStatus.bind(this);
    this.addExistingAsset = this.addExistingAsset.bind(this);
    this.getConfig = this.getConfig.bind(this);
    this.getAllExternalSmartContractDetails =
      this.getAllExternalSmartContractDetails.bind(this);
  }

  async getTxnHashStatus(req, res, next) {
    try {
      const result = await this.service.getTxnHashStatus(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getApprovalForAllStatus(req, res, next) {
    try {
      const result = await this.service.getApprovalForAllStatus(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async addExistingAsset(req, res, next) {
    try {
      // console.log(req.user);
      const result = await this.service.addExistingAssetDetails(req.body);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getConfig(req, res, next) {
    try {
      const result = await this.service.getConfig();
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getAllExternalSmartContractDetails(req, res, next) {
    try {
      const result = await this.service.getAllExternalSmartContractDetails();
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new BlockchainController(BlockchainService);
