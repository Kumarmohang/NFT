/* eslint-disable import/no-named-as-default-member */
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import {
  errorHandle,
  notFoundHandle,
  logErrors,
} from './helpers/handle-errors';
import { logger, swagger } from './services';
import { getStoragePath } from './helpers/utils';

// eslint-disable-next-line import/no-named-as-default
import api from './api';
import { getGAuth } from './config/googleAuth';
// const { create } = require('ipfs-http-client');

const passport = require('passport');
const UserSession = require('../database/models').user_session;

// Pass the global passport object into the configuration function
require('./middlewares/passport')(passport);

// postgres
const db = require('./services/db_init');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser((id, done) => {
  UserSession.findById(id, (err, user) => {
    done(err, user);
  });
});

db.authenticate()
  .then(() => {
    console.log('Database connected...');
    db.sync({ force: true });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

// require('./services/passport');
// create storage dir
const storageDir = getStoragePath();
if (!fs.existsSync(storageDir)) {
  fs.mkdirSync(storageDir, { recursive: true });
}

const rootApi = '/api/v1';
const ROOT_FOLDER = path.join(__dirname, '..');
const SRC_FOLDER = path.join(ROOT_FOLDER, 'src');
getGAuth();
const app = express();

app.set('trust proxy', 1); // trust first proxy

// Security
app.use(helmet());
app.use(cors());

app.use(cookieParser());
// logs http request
app.use(morgan(process.env.LOG_FORMAT || 'dev', { stream: logger.stream }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./middlewares/passport')(passport);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// database
// mongoose.connect(config.mongodb.url, config.mongodb.options);
console.log(__dirname);
app.use(express.static(path.join(ROOT_FOLDER, 'build'), { index: false }));
app.use('/static', express.static(path.join(SRC_FOLDER, 'public')));
app.use('/media', express.static(path.join(ROOT_FOLDER, 'uploads')));
app.get('/', (req, res) => res.json({ message: 'Welcome to test back API!' }));

app.use('/api-docs', swagger());
// app.use('/api-docs2', swagger2());

app.use(rootApi, api);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/admin', (req, res) => {
  res.sendFile(path.join(ROOT_FOLDER, 'build', 'index.html'));
});
app.use('/static', express.static(path.join('resources/static')));

app.use(
  '/static/video',
  express.static(path.join('resources/static'), {
    // eslint-disable-next-line no-unused-vars
    setHeaders(res, _) {
      res.set('content-type', 'video/mp4');
    },
  })
);

app.use(
  '/static/audio',
  express.static(path.join('resources/static'), {
    // eslint-disable-next-line no-unused-vars
    setHeaders(res, _) {
      res.set('content-type', 'audio/mp3');
    },
  })
);

app.use(notFoundHandle);
app.use(logErrors);
app.use(errorHandle);

export default app;
