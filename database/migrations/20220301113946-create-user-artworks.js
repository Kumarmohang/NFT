module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_artworks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.STRING,
      },
      external_link: {
        type: Sequelize.STRING,
      },
      file_url: {
        type: Sequelize.STRING,
      },
      content_type: {
        type: Sequelize.STRING,
      },
      thumbnail_url: {
        type: Sequelize.STRING,
      },
      collection_id: {
        type: Sequelize.UUID,
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
      },
      no_of_likes: {
        type: Sequelize.INTEGER,
      },
      no_of_wishlist: {
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // references : 'platform_users',
        // referenncesKey : 'id',
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
    await queryInterface.dropTable('user_artworks');
  },
};
