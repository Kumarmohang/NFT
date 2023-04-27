import passport from 'passport';
import Response from '../helpers/response';
import config from '../config';

export default class AuthService {
  static getTokenFromHeaderOrQuerystring(req) {
    const re = /(\S+)\s+(\S+)/;
    if (req.headers.authorization) {
      const matches = req.headers.authorization.match(re);
      return matches && { scheme: matches[1], value: matches[2] };
    }
    if (req.query && req.query.token) {
      const matches = req.query.token.match(re);
      return matches && { scheme: matches[1], value: matches[2] };
    }
    return null;
  }

  static required(req, res, next) {
    return passport.authenticate('jwt', { session: false }, (err, user) => {
      // console.log('=======info==========', info);
      if (err) {
        return next(err);
      }
      console.log(req.baseUrl, req.path);
      const exceptionLists = [{ method: 'GET', originalUrl: '/api/v1/nft/' }];
      const { baseUrl, path, method, headers } = req;
      // console.log(typeof originalUrl, typeof method);
      const exceptionFlag = exceptionLists.find(
        (item) =>
          // console.log('item', item, originalUrl, method);
          // console.log(method === item.method);
          `${baseUrl}${path}` === item.originalUrl && method === item.method
      );
      // console.log('Exceptio  ', exceptionFlag);
      if (!exceptionFlag) {
        if (!user) {
          return Response.error(
            res,
            {
              message: 'Unauthorized',
              errors: 'Invalid Token',
              code: 401,
            },
            401
          );
        }

        req.logIn(user, (error) => {
          if (error) {
            return next(error);
          }
          return next();
        });
      } else {
        // if (user) {
        req.logIn(user, (error) => {
          if (error) {
            if (headers.authorization) {
              return Response.error(
                res,
                {
                  message: 'Unauthorized',
                  errors: 'Invalid Token',
                  code: 401,
                },
                401
              );
            }
            return next();
          }
          return next();
        });
        // }

        // return next();
      }
    })(req, res, next);
  }

  static roles(roles = []) {
    return (req, res, next) => {
      if (typeof roles === 'string') {
        roles = [roles];
      }
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return Response.error(
          res,
          {
            errors: 'You are not authorized to access this page!',
            code: 401,
            message: 'Unauthorized',
          },
          401
        );
      }

      // authentication and authorization successful
      next();
    };
  }

  static optional(req, res, next) {
    // const token = AuthService.getTokenFromHeaderOrQuerystring(req);
    if (config.isMainDb) {
      return AuthService.required(req, res, next);
    }
    next();
  }

  static isAdmin() {
    return AuthService.roles('admin');
  }
}

// export const authLocal = passport.authenticate('local', { session: false });
export const authLocal = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return Response.error(
        res,
        {
          message: 'Unauthorized',
          code: 401,
          errors: 'Your username or password is incorrect',
        },
        401
      );
    }
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      return next();
    });
  })(req, res, next);
};
export const authJwt = passport.authenticate('jwt', { session: false });
export const authFacebookToken = passport.authenticate('facebook-token');
export const authGoogleToken = passport.authenticate('google-token');
