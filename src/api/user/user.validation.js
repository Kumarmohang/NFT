import Joi from 'joi';

const UserArtworkHistoryValidation = {
  artworkId: Joi.string().uuid(),
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
};

export const UserArtworkHistorySchema = Joi.object(
  UserArtworkHistoryValidation
);

const ProfileGetValidation = {
  userId: Joi.string().uuid(),
};

const AllUsersValidation = {
  offset: Joi.number().default(0).greater(-1).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
  search: Joi.string().default('').optional(),
};

export const ProfileGetSchema = Joi.object(ProfileGetValidation);

export const AllUsersSchema = Joi.object(AllUsersValidation);
