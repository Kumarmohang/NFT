'use strict';
const { uuid } = require('uuidv4');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('landing_page_stats', [{
      id : uuid(),
      artworks_count: 0,
      auctions_count: 0,
      artist_count: 0,
      total_transactions_count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('landing_page_stats', null, {});
  }
};
