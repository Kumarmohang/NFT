module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft_lists', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      artwork_id: {
        type: Sequelize.UUID,
        references: {
          model: 'user_artworks',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      file_url: {
        type: Sequelize.STRING,
      },
      thumbnail_url: {
        type: Sequelize.STRING,
      },
      content_type: {
        type: Sequelize.STRING,
      },
      type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'master_types',
          key: 'id',
        },
      },
      collection_id: {
        type: Sequelize.UUID,
      },
      external_link: {
        type: Sequelize.STRING,
      },
      creator_id: {
        type: Sequelize.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      creator_public_address: {
        type: Sequelize.STRING,
      },
      smart_contract_address: {
        type: Sequelize.STRING,
      },
      ipfs_hash: {
        type: Sequelize.STRING,
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
      },
      token_id: {
        type: Sequelize.STRING,
      },
      blockchain_txn_hash: {
        type: Sequelize.STRING,
      },
      mint_status: {
        type: Sequelize.STRING,
      },
      minted_datetime: {
        type: Sequelize.DATE,
      },
      current_owner_public_key: {
        type: Sequelize.STRING,
      },
      current_owner_id: {
        type: Sequelize.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      network_type: {
        type: Sequelize.STRING,
      },
      network_id: {
        type: Sequelize.STRING,
      },
      blockchain_networks_id: {
        type: Sequelize.STRING,
      },
      network_name: {
        type: Sequelize.STRING,
      },
      no_of_likes: {
        type: Sequelize.INTEGER,
      },
      no_of_wishlist: {
        type: Sequelize.INTEGER,
      },
      smart_contract_type: {
        type: Sequelize.STRING,
      },
      nft_type: {
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
  async down(queryInterface) {
    await queryInterface.dropTable('nft_lists');
  },
};
