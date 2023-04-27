'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'marketplace_sell_orders',
      'marketplace_fees',
      {
        type: Sequelize.INTEGER,
      }
    );
    await queryInterface.addColumn(
      'marketplace_sell_orders',
      'marketplace_fees_recipient',
      {
        type: Sequelize.STRING,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
      'marketplace_sell_orders',
      'marketplace_fees'
    );
    await queryInterface.removeColumn(
      'marketplace_sell_orders',
      'marketplace_fees_recipient'
    );
  },
};
