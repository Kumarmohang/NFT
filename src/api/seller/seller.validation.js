import Joi from 'joi';

const aggregateValues = ['value_of_transactions', 'count_of_transactions'];
const durationUnitValues = ['hours', 'days', 'months'];

const TrendingSellerGetValidation = {
  aggregate_by: Joi.string().valid(...aggregateValues),
  duration: Joi.number(),
  duration_unit: Joi.string().valid(...durationUnitValues),
  type: Joi.number().default(0).optional(),
  theme: Joi.number().default(0).optional(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
};

export const TrendingSellerGetSchema = Joi.object(TrendingSellerGetValidation);

const SellerGetValidation = {
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(10).positive().optional(),
};

export const SellerGetSchema = Joi.object(SellerGetValidation);
