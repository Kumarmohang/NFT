module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('artwork_themes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nft_id: {
        type: Sequelize.UUID,
        allowNull: null,
        references: {
          model: 'nft_lists',
          key: 'id',
        },
        // references : 'user_artworks',
        // referenncesKey : 'id'
      },
      theme_id: {
        type: Sequelize.UUID,
        references: {
          model: 'master_themes',
          key: 'id',
        },
        // references : 'master_themes',
        // referenncesKey : 'id'
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
    await queryInterface.dropTable('artwork_themes');
  },
};
