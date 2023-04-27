import { job } from './web3Cron';
import { fetchExternalNftsJob } from './externalNftCron';
// import { job } from './lazyMintCron';

const db = require('../services/db_init');

db.authenticate()
  .then(() => {
    console.log('Database connected...');
    db.sync({ force: true });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

job;
fetchExternalNftsJob;
// getTxnHash;
