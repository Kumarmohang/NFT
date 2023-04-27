module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('decentraland_nft_lists', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token_id: {
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
      description: {
        type: Sequelize.TEXT,
      },
      external_link: {
        type: Sequelize.STRING,
      },
      file_url: {
        type: Sequelize.STRING,
      },
      smart_contract_address: {
        type: Sequelize.STRING,
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
      network_name: {
        type: Sequelize.STRING,
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
      },
      is_land: {
        type: Sequelize.BOOLEAN,
      },
      attributes: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('decentraland_nft_lists');
  },
};
