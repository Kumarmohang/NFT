const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres', 'postgres', 'naman123', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = db;
