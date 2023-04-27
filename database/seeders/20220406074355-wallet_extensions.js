'use strict';

const { uuid } = require("uuidv4");

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
    return queryInterface.bulkInsert('wallet_extensions', [
      {
        id: uuid(),
        name: 'Metamask',
        identifier: 'metamask',
        image_url:
          'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png',
        is_popular: true,
        is_enabled: false,
        order: 1,
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
    await queryInterface.bulkDelete('wallet_extensions', null, {});
  },
};
