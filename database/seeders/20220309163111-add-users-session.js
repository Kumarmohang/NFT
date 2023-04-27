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

    await queryInterface.bulkInsert('user_sessions', [
      {
        id: uuid(),
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        session_tokens: 's1',
        expiry_time: new Date('13-April-2022').toISOString(),
        // expiry_time : new Date('2022-03-13T00:00:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuid(),
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        session_tokens: 's2',
        // expiry_time : new Date.parse('31-04-2022'),
        // expiry_time : new Date('2022-03-14T00:00:00'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // await queryInterface.sequelize.query(
    //   "SELECT setval('user_sessions_id_seq', max(id)) FROM user_sessions;"
    // );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_sessions', null, {});
  },
};
