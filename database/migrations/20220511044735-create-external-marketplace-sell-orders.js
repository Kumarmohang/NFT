'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('external_marketplace_sell_orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nft_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // references : 'nft_lists',
        // referenncesKey : 'id'
        references: {
          model: 'decentraland_nft_lists',
          key: 'id',
        },
      },
      seller_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // references : 'platform_users',
        // referenncesKey : 'id'
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      seller_public_key: {
        type: Sequelize.STRING,
      },
      marketplace_publish_datetime: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        values: ['active', 'cancelled', 'complete', 'failed'],
        allowNull: false,
      },
      status_reason: {
        type: Sequelize.STRING,
      },
      txn_value: {
        type: Sequelize.DOUBLE,
      },
      txn_symbol: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('external_marketplace_sell_orders');
  },
};
