'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marketplace_sell_orders', {
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
          model: 'nft_lists',
          key: 'id',
        },
      },
      artwork_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // references : 'user_artworks',
        // referenncesKey : 'id'
        references: {
          model: 'user_artworks',
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
        allowNull: false,
      },
      marketplace_publish_datetime: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        values: ['active', 'cancelled', 'complete', 'failed'],
        allowNull: false,
      },
      transaction_value: {
        type: Sequelize.INTEGER,
      },
      transaction_symbol: {
        type: Sequelize.STRING,
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
      collection_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user_collections',
          key: 'id',
        },
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
    await queryInterface.dropTable('marketplace_sell_orders');
  },
};
