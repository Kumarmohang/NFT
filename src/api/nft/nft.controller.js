import NftService from './nft.service';
import { handleResponse } from '../../helpers';

class NftController {
  constructor(service) {
    this.service = service;
    this.getNfts = this.getNfts.bind(this);
    this.createNfts = this.createNfts.bind(this);
    this.editNfts = this.editNfts.bind(this);
    this.nftDetails = this.nftDetails.bind(this);
    this.nftHistory = this.nftHistory.bind(this);
    this.toggleNftLike = this.toggleNftLike.bind(this);
    this.getTrendingNfts = this.getTrendingNfts.bind(this);
    this.initiateBuyTransaction = this.initiateBuyTransaction.bind(this);
    this.buyNfts = this.buyNfts.bind(this);
    this.sellNfts = this.sellNfts.bind(this);
    this.cancelNfts = this.cancelNfts.bind(this);
    this.initiateMint = this.initiateMint.bind(this);
    this.mintNft = this.mintNft.bind(this);
    this.publishNft = this.publishNft.bind(this);
  }

  async getNfts(req, res, next) {
    try {
      // console.log(req.query);
      const result = await this.service.getNfts(req);
      return handleResponse.success(res, { ...result });
    } catch (error) {
      next(error);
    }
  }

  async createNfts(req, res, next) {
    try {
      // console.log('****** ', req);
      // console.log('### ', req.originalname);
      // console.log('### ', req.files);
      // console.log('### ', req.files.photo);
      // console.log('### ', req.files.logo);
      // console.log(req.headers);
      // console.log('hi');
      // console.log(req.mimetype);
      const result = await this.service.createNfts(req);
      // console.log(result)
      // process.send({ type: 'Naman' });
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async editNfts(req, res, next) {
    try {
      const result = await this.service.editNfts(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async nftDetails(req, res, next) {
    try {
      const result = await this.service.nftDetails(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async nftHistory(req, res, next) {
    try {
      const result = await this.service.nftHistory(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async toggleNftLike(req, res, next) {
    try {
      console.log(req.body);
      const result = await this.service.toggleNftLike(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingNfts(req, res, next) {
    try {
      const result = await this.service.getTrendingNfts(req.query);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async initiateBuyTransaction(req, res, next) {
    try {
      const result = await this.service.initiateBuyTransaction(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async buyNfts(req, res, next) {
    try {
      const result = await this.service.buyNfts(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async sellNfts(req, res, next) {
    try {
      const result = await this.service.sellNfts(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async cancelNfts(req, res, next) {
    try {
      const result = await this.service.cancelNfts(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async initiateMint(req, res, next) {
    try {
      const result = await this.service.initiateMint(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async mintNft(req, res, next) {
    try {
      const result = await this.service.mintNft(req);
      // console.log(result)
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }

  async publishNft(req, res, next) {
    try {
      const result = await this.service.publishNft(req);
      return handleResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export default new NftController(NftService);
