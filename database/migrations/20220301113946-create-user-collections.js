module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_collections', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      logo_url: {
        type: Sequelize.STRING,
      },
      cover_photo_url: {
        type: Sequelize.STRING,
      },
      public_address: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      no_of_likes: {
        type: Sequelize.INTEGER,
      },
      no_of_wishlist: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('user_collections');
  },
};
