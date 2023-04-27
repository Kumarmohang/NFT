'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('collection_likes', [
      {
        id: 1,
        collection_id: 1,
        user_public_key: '0x0q9wdhoq8eg9812989hd9q',
        user_id: 1,
        is_enabled: true,
        createdAt: new Date('2022-03-01T00:00:00'),
        updatedAt: new Date('2022-03-01T00:00:00'),
      },
      {
        id: 2,
        collection_id: 2,
        user_public_key: '0x3oq2ie398y38ndsoq929u2',
        user_id: 2,
        is_enabled: true,
        createdAt: new Date('2022-03-02T00:00:00'),
        updatedAt: new Date('2022-03-02T00:00:00'),
      },
      {
        id: 3,
        collection_id: 3,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 1,
        is_enabled: true,
        createdAt: new Date('2022-03-03T00:00:00'),
        updatedAt: new Date('2022-03-03T00:00:00'),
      },
      {
        id: 4,
        collection_id: 1,
        user_public_key: '0x0q9wdhoq8eg9812989hd9q',
        user_id: 1,
        is_enabled: false,
        createdAt: new Date('2022-03-04T00:00:00'),
        updatedAt: new Date('2022-03-04T00:00:00'),
      },
      {
        id: 5,
        collection_id: 1,
        user_public_key: '0x0q9wdhoq8eg9812989hd9q',
        user_id: 1,
        is_enabled: true,
        createdAt: new Date('2022-03-05T00:00:00'),
        updatedAt: new Date('2022-03-05T00:00:00'),
      },
      {
        id: 6,
        collection_id: 2,
        user_public_key: '0x3oq2ie398y38ndsoq929u2',
        user_id: 2,
        is_enabled: true,
        createdAt: new Date('2022-03-06T00:00:00'),
        updatedAt: new Date('2022-03-06T00:00:00'),
      },
      {
        id: 7,
        collection_id: 2,
        user_public_key: '0x3oq2ie398y38ndsoq929u2',
        user_id: 2,
        is_enabled: true,
        createdAt: new Date('2022-03-07T00:00:00'),
        updatedAt: new Date('2022-03-07T00:00:00'),
      },
      {
        id: 8,
        collection_id: 2,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 3,
        is_enabled: true,
        createdAt: new Date('2022-03-08T00:00:00'),
        updatedAt: new Date('2022-03-08T00:00:00'),
      },
      {
        id: 9,
        collection_id: 2,
        user_public_key: '0xoq2ie398y38ndsoq929u2',
        user_id: 4,
        is_enabled: true,
        createdAt: new Date('2022-03-08T00:00:00'),
        updatedAt: new Date('2022-03-08T00:00:00'),
      },
      {
        id: 10,
        collection_id: 2,
        user_public_key: '0xncpoq9ynxoq98wb9w8w8',
        user_id: 5,
        is_enabled: true,
        createdAt: new Date('2022-03-09T00:00:00'),
        updatedAt: new Date('2022-03-09T00:00:00'),
      },
      {
        id: 11,
        collection_id: 3,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 3,
        is_enabled: true,
        createdAt: new Date('2022-03-09T00:00:00'),
        updatedAt: new Date('2022-03-09T00:00:00'),
      },
      {
        id: 12,
        collection_id: 3,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 3,
        is_enabled: true,
        createdAt: new Date('2022-03-13T00:00:00'),
        updatedAt: new Date('2022-03-13T00:00:00'),
      },
    ]);

    // await queryInterface.sequelize.query(
    //   "SELECT setval('collection_likes_id_seq', max(id)) FROM collection_likes;"
    // );
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
