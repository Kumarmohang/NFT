import httpStatus from 'http-status';
import _ from 'lodash';
import { logger } from '../../services';
import { Controller } from '../../helpers/common';
// eslint-disable-next-line import/no-unresolved
import ArtworkService from './artworks.service';
import { handleResponse } from '../../helpers';
import config from '../../config';
import Response from '../../helpers/response';

class ArtworkController extends Controller {
  constructor(service, name) {
    super(service, name);
    this.searchArtwork = this.searchArtwork.bind(this);
    this.getArtworkDetails = this.getArtworkDetails.bind(this);
    this.getMultipleArtworkDetails = this.getMultipleArtworkDetails.bind(this);
    this.getArtworkAuctions = this.getArtworkAuctions.bind(this);
    this.getArtworkMetadata = this.getArtworkMetadata.bind(this);
    this.getMultipleArtworkMetadata =
      this.getMultipleArtworkMetadata.bind(this);
    this.extend_artowrk_obj = this.extend_artowrk_obj.bind(this);
  }

  extend_artowrk_obj(obj) {
    const newObj = obj.toJSON();
    const images = obj?.images.map((x) => ({
      url: x.originalUrl,
      size: x.type,
    }));
    newObj.auctionRecords = _.sortBy(newObj.auctionRecords, [
      'saleDate',
      'auctionHouseName',
    ]);
    newObj.images = images;
    newObj.description = Array.isArray(obj.description)
      ? obj.description.join('<br>')
      : '';
    newObj.literature = Array.isArray(obj.literature)
      ? obj.literature.join('<br>')
      : '';
    newObj.provenance = Array.isArray(obj.provenance)
      ? obj.provenance.join('<br>')
      : '';
    newObj.exhibitions = Array.isArray(obj.exhibitions)
      ? obj.exhibitions.join('<br>')
      : '';
    return newObj;
  }

  async searchArtwork(req, res, next) {
    try {
      logger.info(
        `In searchArtwork function: Started for query ${JSON.stringify(
          req.query
        )}`
      );
      const result = await this.service.handleGetArtworks(req.query);
      logger.info(
        `In searchArtwork function: Successfully got result ${JSON.stringify({
          count: result.docs.length,
        })}`
      );
      const output = [];
      for (let i = 0; i < result.docs.length; i++) {
        const obj = {
          id: result.docs[i]._id,
          artworkId: result.docs[i].artworkId,
          image: result.docs[i].images?.[0]?.originalUrl || '',
          title: result.docs[i].title,
          creationYear: result.docs[i].creationYear,
          categoryId: result.docs[i].categoryId,
          artistName: result.docs[i].artistName,
          artistId: result.docs[i].artistId,
          medium: result.docs[i].medium,
          synonyms: result.docs[i].synonyms,
          // score: result.docs[i]
        };
        if (!config.isMainDb)
          obj.referenceId = result.docs[i].referenceId || '';
        output.push(obj);
      }
      result.docs = output;
      logger.info(
        `In searchArtwork function: Successfully formated results ${JSON.stringify(
          output
        )}`
      );
      return handleResponse.success(res, result);
    } catch (e) {
      logger.error(
        `In searchArtwork function: Error occured ${JSON.stringify(e)}`
      );
      next(e);
    }
  }

  async getArtworkDetails(req, res, next) {
    try {
      const result = await this.service.handleGetArtwork(
        req.params.artworkId,
        req.query.referenceId
      );
      if (!result) {
        return Response.error(
          res,
          {
            code: 404, // `${this._name.toUpperCase()}_NOT_FOUND`,
            message: 'Record not found', // `${this._name} does not found with id ${req.params.artworkId}`
          },
          httpStatus.NOT_FOUND
        );
      }
      return handleResponse.success(res, this.extend_artowrk_obj(result));
    } catch (e) {
      next(e);
    }
  }

  async getMultipleArtworkDetails(req, res, next) {
    try {
      const artworkIds = req.query.artworkId.split(',');
      const query = {
        artworkId: { $in: artworkIds },
      };
      const result = await this.service.find(query);
      const output = {
        docs: result.map(this.extend_artowrk_obj),
        total: result.length,
        limit: result.length,
        page: 1,
        totalPages: 1,
      };

      return handleResponse.success(res, output);
    } catch (e) {
      next(e);
    }
  }

  async getArtworkAuctions(req, res, next) {
    try {
      const result = await this.service.findOne(
        { artworkId: req.params.artworkId },
        { artworkId: 1, auctionRecords: 1 }
      );
      const output = {
        artworkId: result.artworkId,
        results: result.auctionRecords,
      };
      return handleResponse.success(res, output);
    } catch (e) {
      next(e);
    }
  }

  async getArtworkMetadata(req, res, next) {
    try {
      const result = await this.service.handleGetArtworkMetadata(
        req.params.artworkId
      );
      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async getMultipleArtworkMetadata(req, res, next) {
    try {
      const result = await this.service.handleGetMultipleArtworkMetadata(
        req.query.artworkId
      );
      const output = {
        docs: result,
        total: result.length,
        limit: result.length,
        page: 1,
        totalPages: 1,
      };
      return handleResponse.success(res, output);
    } catch (e) {
      next(e);
    }
  }
}

export default new ArtworkController(ArtworkService, 'Artwork');
