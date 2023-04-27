// 'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marketplace_transactions', {
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
      buyer_public_key: {
        type: Sequelize.STRING,
      },
      seller_public_key: {
        type: Sequelize.STRING,
      },
      buyer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      seller_id: {
        type: Sequelize.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      marketplace_buy_init_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      marketplace_buy_end_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
      },
      status_reason: {
        type: Sequelize.TEXT,
      },
      marketplace_sell_record_id: {
        type: Sequelize.UUID,
      },
      txn_value: {
        type: Sequelize.DOUBLE,
      },
      txn_symbol: {
        type: Sequelize.STRING,
      },
      blockchain_txn_hash: {
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
  async down(queryInterface) {
    await queryInterface.dropTable('marketplace_transactions');
  },
};
