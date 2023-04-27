'use strict';

const { uuid } = require("uuidv4");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('config_stores', [{
      id:uuid(),
      artwork_type_id : 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
      commision : 1.5,
      type : '',
      currency : '',
      is_enabled : false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('config_stores', null, {});
  }
};
