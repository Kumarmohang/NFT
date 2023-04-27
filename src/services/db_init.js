const Sequelize = require('sequelize');

let dbConfig = require('../config');

dbConfig = dbConfig.default.postgres;
console.log(dbConfig);
// const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });
const db = new Sequelize(dbConfig.url);
module.exports = db;
