import Joi from 'joi';

// accepts a valid UUID v4 string as id
export const ObjectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

export const UUID = Joi.string().regex(
  /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
);

export const UUIDArray = Joi.string().regex(
  /(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)(,\s*(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b))*/
);

export const stringArray = Joi.string().regex(/(\w+)(,\s*(\w+))*/);

export const stringOfNumbers = Joi.string().regex(/^[0-9]+$/);

export const objectIdSchema = Joi.object({
  id: ObjectId.required(),
});

export const paginateValidationSchema = Joi.object({
  sort: Joi.string().default('-createdAt').optional(),
  offset: Joi.number().greater(-1).default(0).optional(),
  limit: Joi.number().greater(0).default(25).positive().optional(),
  filter: Joi.string().optional(),
});
