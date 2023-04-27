import Joi from 'joi';
import { schemas } from '../../helpers';

const { stringArray } = schemas;

export const artworkSearchSchema = Joi.object({
  name: Joi.string(),
  artistId: Joi.string(),
  category: Joi.string(),
  creationYearFrom: Joi.number().positive().greater(1000),
  creationYearTo: Joi.number().positive().greater(1000),
  lastAuctionDateFrom: Joi.string(),
  lastAuctionDateTo: Joi.string(),
  heightFrom: Joi.string(),
  heightTo: Joi.string(),
  widthFrom: Joi.string(),
  widthTo: Joi.string(),
  depthFrom: Joi.string(),
  depthTo: Joi.string(),
  sortBy: Joi.string()
    .valid(
      'lastPriceSold',
      'name',
      'creationYear',
      'name_asc',
      'name_desc',
      'creationYear_asc',
      'creationYear_desc',
      'lastPriceSold_asc',
      'lastPriceSold_desc'
    )
    .default('lastPriceSold_desc')
    .optional(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
});

export const artworkIdValidateSchema = Joi.object({
  artworkId: Joi.string().required(),
});

export const artworkIdsValidateSchema = Joi.object({
  artworkId: stringArray.required(),
});

export const referenceIdDetailsValidateSchema = Joi.object({
  referenceId: Joi.bool().optional(),
});
