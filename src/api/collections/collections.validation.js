import Joi from 'joi';

const CollectionGetValidation = {
  userId: Joi.string().uuid(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
  search: Joi.string().default('').optional(),
};

const aggregateValues = [
  'no_of_likes',
  'value_of_transactions',
  'count_of_transactions',
];
const durationUnitValues = ['hours', 'days', 'months'];

const TrendingCollectionGetValidation = {
  aggregate_by: Joi.string().valid(...aggregateValues),
  duration: Joi.number(),
  duration_unit: Joi.string().valid(...durationUnitValues),
  type: Joi.number().default(0).optional(),
  theme: Joi.number().default(0).optional(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
};

const CollectionLikeValidation = {
  isLike: Joi.string(),
};

export const CollectionGetSchema = Joi.object(CollectionGetValidation);

export const TrendingCollectionGetSchema = Joi.object(
  TrendingCollectionGetValidation
);

export const CollectionLikeSchema = Joi.object(CollectionLikeValidation);
