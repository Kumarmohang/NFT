'use strict';
const { uuid } = require('uuidv4');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('crypto_configs', [
      {
        id: uuid(),
        name: 'Ethereum',
        symbol: 'ETH',
        image_url:
          'https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg',
        blockchain_technology: 'Ethereum',
        is_enabled: false,
        current_rate_usd: 4000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        name: 'Matic',
        symbol: 'MATIC',
        image_url:
          'https://cdn.iconscout.com/icon/free/png-256/polygon-token-4086724-3379854.png',
        blockchain_technology: 'Polygon',
        is_enabled: false,
        current_rate_usd: 0.37,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        name: 'DogeCoin',
        symbol: 'DOGE',
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPzt6BmomrkmSZ5aLffDnnZxZc4gg97i0mU6ivc9-oxt_HyrwIMxEqz17Gnd7NjevEiRY&usqp=CAU',
        blockchain_technology: 'Dogecoin',
        is_enabled: false,
        current_rate_usd: 0.16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        name: 'Tether',
        symbol: 'USDT',
        image_url:
          'https://st.depositphotos.com/61782154/54194/v/380/depositphotos_541944972-stock-illustration-tether-symbol-vector-icon-usdt.jpg?forcejpeg=true',
        blockchain_technology: 'Ethereum',
        is_enabled: false,
        current_rate_usd: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('crypto_configs', null, {});
  },
};
