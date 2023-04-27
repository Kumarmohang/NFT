/* eslint-disable camelcase */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
// const fs = require('fs');
// const path = require('path');
// const UserSession = require('../../database/models').user_sessions;
const PlatformUsers = require('../../database/models').platform_users;

// const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Bearer'),
  secretOrKey: process.env.JWT_REFRESH_SECRET,
  algorithms: ['HS256'],
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      if (jwt_payload) {
        console.log('***** ', jwt_payload.sub);
        const userResult = await PlatformUsers.findByPk(jwt_payload.sub, {
          raw: true,
        });
        jwt_payload.userDetails = userResult;
        return done(null, jwt_payload);
      }
      return done(null, false);
    })
  );
};
