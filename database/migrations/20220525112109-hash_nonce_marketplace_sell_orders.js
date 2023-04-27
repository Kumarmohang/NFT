'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('marketplace_sell_orders', 'txn_hash', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('marketplace_sell_orders', 'nonce', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('marketplace_sell_orders', 'signature', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('marketplace_sell_orders', 'txn_hash');
    await queryInterface.removeColumn('marketplace_sell_orders', 'nonce');
    await queryInterface.removeColumn('marketplace_sell_orders', 'signature');
  },
};
