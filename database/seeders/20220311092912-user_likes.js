const { uuid } = require('uuidv4');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_likes', [
      {
        id: uuid(),
        artwork_id: 1,
        user_public_key: '0x0q9wdhoq8eg9812989hd9q',
        user_id: 1,
        is_enabled: true,
        createdAt: new Date('2022-03-01T00:00:00'),
        updatedAt: new Date('2022-03-01T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 2,
        user_public_key: '0x3oq2ie398y38ndsoq929u2',
        user_id: 2,
        is_enabled: true,
        createdAt: new Date('2022-03-02T00:00:00'),
        updatedAt: new Date('2022-03-02T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 3,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 1,
        is_enabled: true,
        createdAt: new Date('2022-03-03T00:00:00'),
        updatedAt: new Date('2022-03-03T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 1,
        user_public_key: '0x0q9wdhoq8eg9812989hd9q',
        user_id: 1,
        is_enabled: false,
        createdAt: new Date('2022-03-04T00:00:00'),
        updatedAt: new Date('2022-03-04T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 1,
        user_public_key: '0x0q9wdhoq8eg9812989hd9q',
        user_id: 1,
        is_enabled: true,
        createdAt: new Date('2022-03-05T00:00:00'),
        updatedAt: new Date('2022-03-05T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 2,
        user_public_key: '0x3oq2ie398y38ndsoq929u2',
        user_id: 2,
        is_enabled: true,
        createdAt: new Date('2022-03-06T00:00:00'),
        updatedAt: new Date('2022-03-06T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 2,
        user_public_key: '0x3oq2ie398y38ndsoq929u2',
        user_id: 2,
        is_enabled: true,
        createdAt: new Date('2022-03-07T00:00:00'),
        updatedAt: new Date('2022-03-07T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 2,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 3,
        is_enabled: true,
        createdAt: new Date('2022-03-08T00:00:00'),
        updatedAt: new Date('2022-03-08T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 2,
        user_public_key: '0xoq2ie398y38ndsoq929u2',
        user_id: 4,
        is_enabled: true,
        createdAt: new Date('2022-03-08T00:00:00'),
        updatedAt: new Date('2022-03-08T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 2,
        user_public_key: '0xncpoq9ynxoq98wb9w8w8',
        user_id: 5,
        is_enabled: true,
        createdAt: new Date('2022-03-09T00:00:00'),
        updatedAt: new Date('2022-03-09T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 3,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 3,
        is_enabled: true,
        createdAt: new Date('2022-03-09T00:00:00'),
        updatedAt: new Date('2022-03-09T00:00:00'),
      },
      {
        id: uuid(),
        artwork_id: 3,
        user_public_key: '0x3wkidq98763nodx98q0nx',
        user_id: 3,
        is_enabled: true,
        createdAt: new Date('2022-03-13T00:00:00'),
        updatedAt: new Date('2022-03-13T00:00:00'),
      },
    ]);
    // await queryInterface.sequelize.query(
    //   "SELECT setval('user_likes_id_seq', max(id)) FROM user_likes;"
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
    await queryInterface.bulkDelete('user_likes', null, {});
  },
};
