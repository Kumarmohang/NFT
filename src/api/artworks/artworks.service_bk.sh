import moment from 'moment';
import ObjectID from 'mongoose';
import { Service } from '../../helpers/common';
import { logger } from '../../services';
import Artwork from './artworks.model';
import config from '../../config';
import * as auctions from './output_jsons/auctions.json';
import * as artwork from './output_jsons/artwork.json';
import * as artwork_metadata from './output_jsons/artwork_metadata.json';
import * as artworks_metadata from './output_jsons/artworks_metadata.json';

class ArtworkService extends Service {
  constructor(model) {
    super(model);
  }

  async handleGetArtworks(query) {
    const { offset, limit } = query;
    let { sortBy } = query;
    let sortQuery = {};
    const mquery = {};
    const regexQuery = {};
    const projectionObj = {
      _id: 1,
      title: 1,
      creationYear: 1,
      medium: 1,
      categoryId: 1,
      'images.originalUrl': 1,
      artistId: 1,
      artistName: 1,
      artworkId: 1,
      medium: 1,
      synonyms: 1,
    };
    if (!config.isMainDb) {
      projectionObj.referenceId = 1;
    }
    if (query.name) {
      query.name = query.name.replace('*', '');
      const search_phrase = `"${query.name}"`;
      // mquery['title'] = { $exists:true, $ne:null, $regex: query.name, $options: 'i' };
      const count = await this._model.count({ $text: { $search: query.name } });
      if (count === 0) {
        query.name = `.*${query.name}.*`;
        mquery.title = {
          $exists: true,
          $nin: [null, ''],
          $regex: query.name,
          $options: 'i',
        };
      } else {
        mquery.title = {
          $exists: true,
          $nin: [null, ''],
        };
        mquery.$text = { $search: query.name };
        sortQuery = { score: { $meta: 'textScore' } };
        projectionObj.score = { $meta: 'textScore' };
      }
    }
    if (query.artistId) {
      query.artistId = query.artistId.split(',');
      mquery.artistId = { $exists: true, $ne: null, $in: query.artistId };
    }
    if (query.category) {
      query.category = query.category.split(',');
      mquery.categoryId = { $exists: true, $ne: null, $in: query.category };
    }
    if (!!query.creationYearFrom && !!query.creationYearTo) {
      mquery.creationYear = {
        $exists: true,
        $ne: null,
        $gte: query.creationYearFrom,
        $lte: query.creationYearTo,
      };
    } else if (query.creationYearFrom) {
      mquery.creationYear = {
        $exists: true,
        $ne: null,
        $gte: query.creationYearFrom,
      };
    } else if (query.creationYearTo) {
      mquery.creationYear = {
        $exists: true,
        $ne: null,
        $lte: query.creationYearTo,
      };
    }
    if (query.lastAuctionDateFrom) {
      mquery['auctionRecords.auctionStartDate'] = {
        $exists: true,
        $ne: null,
        $gte: moment(query.lastAuctionDateFrom, 'DD-MM-YYYY').toDate(),
      };
    }
    if (query.lastAuctionDateTo) {
      mquery['auctionRecords.auctionEndDate'] = {
        $exists: true,
        $ne: null,
        $lte: moment(query.lastAuctionDateTo, 'DD-MM-YYYY').toDate(),
      };
    }
    if (query.heightFrom) {
      mquery['dimensions.heightMm'] = {
        $exists: true,
        $ne: null,
        $gte: query.heightFrom,
      };
    }
    if (query.heightTo) {
      mquery['dimensions.heightMm'] = {
        $exists: true,
        $ne: null,
        $lte: query.heightTo,
      };
    }
    if (query.widthFrom) {
      mquery['dimensions.widthMm'] = {
        $exists: true,
        $ne: null,
        $gte: query.widthFrom,
      };
    }
    if (query.widthTo) {
      mquery['dimensions.widthMm'] = {
        $exists: true,
        $ne: null,
        $lte: query.widthTo,
      };
    }
    if (query.depthFrom) {
      mquery['dimensions.depthMm'] = {
        $exists: true,
        $ne: null,
        $gte: query.depthFrom,
      };
    }
    if (query.depthTo) {
      mquery['dimensions.depthMm'] = {
        $exists: true,
        $ne: null,
        $lte: query.depthTo,
      };
    }
    if (sortBy) {
      sortBy = sortBy.replace('name', 'title');
      if (sortBy.indexOf('title') > -1 && !mquery.title) {
        mquery.title = {
          $exists: true,
          $nin: [null, ''],
        };
      }
      // if(sortBy.indexOf('lastPriceSold')>-1 && !mquery.lastPriceSold){
      //   mquery['lastPriceSold'] = {
      //     $exists: true,
      //     $ne: null,
      //   };
      // }
      // if(sortBy.indexOf('creationYear')>-1 && !mquery.creationYear){
      //   mquery['creationYear'] = {
      //     $exists: true,
      //     $ne: null,
      //   };
      // }
      if (sortBy.indexOf('_asc') > -1) {
        sortBy = sortBy.replace('_asc', '');
        sortQuery[sortBy] = 1;
      } else if (sortBy.indexOf('_desc') > -1) {
        sortBy = sortBy.replace('_desc', '');
        sortQuery[sortBy] = -1;
      } else {
        sortQuery[sortBy] = 1;
      }
    } else {
      sortQuery.createdAt = -1;
    }
    sortQuery._id = -1;
    logger.info(
      `In handleGetArtworks function: Before query ${JSON.stringify(
        mquery
      )}sortQuery ${JSON.stringify(sortQuery)}`
    );

    console.log(mquery);
    const result = await this._model.paginate(mquery, {
      offset: offset || 0,
      limit: limit || 1,
      sort: sortQuery,
      projection: projectionObj,
      allowDiskUse: true,
    });
    logger.info(
      `In handleGetArtworks function: After query results are${JSON.stringify(
        result
      )}`
    );

    // console.log(result);
    return result;
    // return artworks['default'];
  }

  async handleGetAuctions() {
    return auctions.default;
  }

  async handleGetArtworkDetails(id) {}

  async handleGetArtwork(id, isReferenceId) {
    let query = {
      artworkId: id,
    };
    const alternativeQuery = {
      _id: id,
    };
    if (!!isReferenceId && !config.isMainDb) {
      query = {
        referenceId: id,
      };
    }
    console.log(query, '******', config.isMainDb, ObjectID.isValidObjectId(id));
    let result = await this.findOne(query);
    if (!result && ObjectID.isValidObjectId(id)) {
      result = await this.findOne(alternativeQuery);
    }
    return result;
  }

  async handleGetArtworkMetadata(id) {
    return artwork_metadata.default;
  }

  async handleGetMultipleArtworkMetadata() {
    return artworks_metadata.default;
  }
}

export default new ArtworkService(Artwork);
