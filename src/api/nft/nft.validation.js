import Joi from 'joi';
import { schemas } from '../../helpers';

const sortValues = [
  'price_asc',
  'price_desc',
  'createdAt_asc',
  'createdAt_desc',
  'trending',
];

const NftGetValidation = {
  typeId: Joi.string().uuid(),
  themeId: schemas.UUID.optional(),
  collectionId: schemas.UUID.optional(),
  search: Joi.string().default('').optional(),
  priceFrom: Joi.number().default(0).optional(),
  priceTo: Joi.number().default(Number.MAX_SAFE_INTEGER).optional(),
  currency: Joi.string().default('ETH').length(3).optional(),
  // forSale: Joi.boolean().default(false).optional(),
  sortBy: Joi.string()
    .valid(...sortValues)
    .optional(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(100).positive().optional(),
  forSale: Joi.boolean().default(false).optional(),
  userId: Joi.string().uuid(),
  creatorRoyalty: Joi.number().optional(0),
};

const aggregateValues = [
  'no_of_likes',
  'value_of_transactions',
  'count_of_transactions',
];
const durationUnitValues = ['hours', 'days', 'months'];

const TrendingNftGetValidation = {
  aggregate_by: Joi.string().valid(...aggregateValues),
  duration: Joi.number(),
  duration_unit: Joi.string().valid(...durationUnitValues),
  typeId: Joi.string().uuid(),
  theme: Joi.number().default(0).optional(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
};

const NftLikeValidation = {
  isLike: Joi.boolean(),
};

const NftHistoryValidation = {
  userId: Joi.string().uuid(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
};

// const sellNftValidation = {

// }

export const NftHistorySchema = Joi.object(NftHistoryValidation);

export const NftGetSchema = Joi.object(NftGetValidation);

export const TrendingNftGetSchema = Joi.object(TrendingNftGetValidation);

export const NftLikeSchema = Joi.object(NftLikeValidation);
