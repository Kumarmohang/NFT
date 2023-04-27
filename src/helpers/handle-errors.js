/* eslint-disable no-unused-vars */
import { isCelebrateError as isCelebrate } from 'celebrate';
import httpStatus from 'http-status';
import { logger } from '../services';
import Response from './response';

export const errorHandle = (error, req, res, next) => {
  console.log(error, typeof error);
  if (typeof error === 'string') {
    // custom application error
    return Response.error(res, {
      message: 'Bad Request',
      code: 400,
      errors: error,
    });
  }
  if (isCelebrate(error)) {
    logger.error('isCelebrate %s', isCelebrate(error));
    // const { joi } = error;
    return Response.error(res, {
      message: 'Bad Request',
      code: 400,
      errors: [...error.details.entries()].map(([key, joiError]) => ({
        key,
        message: joiError.details.map((ele) => ele.message),
      })),
    });
  }
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return Response.error(res, {
      // code: error.name,
      message: 'Bad Request',
      code: 400,
      errors: 'malformatted id',
    });
  }
  if (error.name === 'ValidationError') {
    return Response.error(res, {
      message: 'Bad Request',
      code: 400,
      errors: error.message,
    });
  }
  if (error.name === 'Error') {
    return Response.error(res, {
      message: 'Bad Request',
      code: 400,
      errors: error.message,
    });
  }
  if (error.name === 'CustomError') {
    return Response.error(res, {
      message: 'Bad Request',
      code: 400,
      errors: error,
    });
  }
  // default to 500 server error
  logger.debug('%o', error);
  return Response.error(
    res,
    {
      message: error.message,
    },
    httpStatus.INTERNAL_SERVER_ERROR
  );
};

export const logErrors = (err, req, res, next) => {
  // console.error(err.stack);
  next(err);
};

export const notFoundHandle = (req, res, next) =>
  Response.error(
    res,
    {
      code: '404',
      message: 'Page Not Found',
    },
    404
  );
