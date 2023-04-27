'use strict';

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
     return queryInterface.bulkInsert('artwork_themes', [{
      nft_id : 1,
      theme_id : 'd61f4f5b-0bf9-41ca-9374-aa5470aac5e6',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nft_id : 2,
      theme_id : 'd61f4f5b-0bf9-41ca-9374-aa5470aac5e6',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nft_id : 2,
      theme_id : 'd61f4f5b-0bf9-41ca-9374-aa5470aac5e6',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('artwork_themes', null, {});
  }
};
