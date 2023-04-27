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
     await queryInterface.bulkInsert('user_wishlists', [{
      id : 1,
      artwork_id: 1,
      user_public_key: "0x0q9wdhoq8eg9812989hd9q",
      user_id: 1,
      is_enabled: true,
      createdAt: new Date('2022-03-01T00:00:00'),
      updatedAt: new Date('2022-03-01T00:00:00'),
    },
    {
      id : 2,
      artwork_id: 2,
      user_public_key: "0xoq2ie398y38ndsoq929u2",
      user_id: 4,
      is_enabled: true,
      createdAt: new Date('2022-03-02T00:00:00'),
      updatedAt: new Date('2022-03-02T00:00:00')
    },
    {
      id : 3,
      artwork_id: 3,
      user_public_key: "0xoq2ie398y38ndsoq929u2",
      user_id: 1,
      is_enabled: true,
      createdAt: new Date('2022-03-03T00:00:00'),
      updatedAt: new Date('2022-03-03T00:00:00')
    },
    {
      id : 4,
      artwork_id: 1,
      user_public_key: "0xoq2ie398y38ndsoq929u2",
      user_id: 1,
      is_enabled: false,
      createdAt: new Date('2022-03-04T00:00:00'),
      updatedAt: new Date('2022-03-04T00:00:00')
    },
    {
      id : 5,
      artwork_id: 1,
      user_public_key: "0xoq2ie398y38ndsoq929u2",
      user_id: 1,
      is_enabled: true,
      createdAt: new Date('2022-03-05T00:00:00'),
      updatedAt: new Date('2022-03-05T00:00:00')
    },
    {
      id : 6,
      artwork_id: 2,
      user_public_key: "0xoq2ie398y38ndsoq929u2",
      user_id: 1,
      is_enabled: true,
      createdAt: new Date('2022-03-06T00:00:00'),
      updatedAt: new Date('2022-03-06T00:00:00')
    },
    {
      id : 7,
      artwork_id: 2,
      user_public_key: "0xoq2ie398y38ndsoq929u2",
      user_id: 2,
      is_enabled: true,
      createdAt: new Date('2022-03-07T00:00:00'),
      updatedAt: new Date('2022-03-07T00:00:00')
    },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('user_wishlists', null, {});
  }
};
