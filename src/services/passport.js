/* eslint-disable import/no-unresolved */
import passport from 'passport';
import { Strategy as StrategyJwt, ExtractJwt } from 'passport-jwt';
import FacebookTokenStrategy from 'passport-facebook-token';
import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import LocalStrategy from 'passport-local';
import util from 'util';

import User from '../api/users/users.model';
import logger from './logger';
import config from '../config';

// used to serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// JWT
const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromExtractors([
  ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  ExtractJwt.fromUrlQueryParameter('token'),
]);
jwtOpts.secretOrKey = config.jwt.secret;
passport.use(
  new StrategyJwt(jwtOpts, (payload, done) => {
    User.findOne({ _id: payload.uid })
      .select('-services -token')
      .exec((err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
  })
);

// Facebook
passport.use(
  new FacebookTokenStrategy(
    {
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      profileFields: ['id', 'first_name', 'last_name', 'username', 'picture'],
    },
    (accessToken, refreshToken, profile, done) => {
      // asynchronous
      process.nextTick(() => {
        const profileJson = profile._json;
        logger.info('========profile=--=======', profileJson);
        // find the user in the database based on their facebook id
        User.findOne({ username: profileJson.username }, (err, user) => {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) return done(err);

          // if the user is found, then log them in
          if (user) {
            if (user.avatar) {
              return done(null, user); // user found, return that user
            }
            user.avatar = util.format(
              'http://graph.facebook.com/%s/picture?type=large',
              profileJson.id
            );
            user.save((error, data) => {
              if (error) throw error;

              // if successful, return the user
              return done(null, data);
            });
          } else {
            // if there is no user found with that facebook id, create them
            const newUser = new User();

            // set all of the facebook information in our user model
            newUser.services.facebook.id = profileJson.id;
            newUser.services.facebook.token = accessToken;
            newUser.first_name = profileJson.first_name;
            newUser.last_name = profileJson.last_name;
            newUser.username = profileJson.username;
            newUser.avatar = util.format(
              'http://graph.facebook.com/%s/picture?type=large',
              profileJson.id
            );
            // const newUser = {...newUser}
            // new_user.new = true;
            // save our user to the database
            newUser.save((error) => {
              if (error) {
                throw error;
              }
              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

// local
const localOpts = {
  usernameField: 'username',
};

const localStrategy = new LocalStrategy(
  localOpts,
  (username, password, done) => {
    logger.info('========localStrategy========');
    User.findOne({
      username,
    })
      .then((user) => {
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err) => done(err, false));
  }
);

passport.use(localStrategy);

// Google
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // logger.info("=========profile============: ", profile);
      process.nextTick(() => {
        const profileJson = profile._json;
        // logger.info("=========profile============: ", profile);
        // find the user in the database based on their facebook id
        User.findOne({ username: profileJson.username }, (err, user) => {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          }
          // if there is no user found with that facebook id, create them
          const newUser = new User();

          // set all of the facebook information in our user model
          newUser.services.google.id = profileJson.id;
          newUser.services.google.token = accessToken;
          newUser.first_name = profileJson.given_name;
          newUser.last_name = profileJson.family_name;
          newUser.username = profileJson.username;
          newUser.avatar = profileJson.picture;
          // const new_user = _.assign(newUser);

          // save our user to the database
          newUser.save((error) => {
            if (error) throw error;

            // if successful, return the new user
            return done(null, newUser);
          });
        });
      });
    }
  )
);
