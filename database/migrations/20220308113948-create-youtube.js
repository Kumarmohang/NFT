'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('youtubes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      artwork_id: {
        type: Sequelize.UUID,
        // references : 'user_artwork',
        // referenncesKey : 'id'
        references: {
          model: 'nft_lists',
          key: 'id',
        },
      },
      url: {
        type: Sequelize.STRING,
      },
      channel_name: {
        type: Sequelize.STRING,
      },
      channel_url: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      no_of_likes: {
        type: Sequelize.INTEGER,
      },
      no_of_comments: {
        type: Sequelize.INTEGER,
      },
      publish_status: {
        type: Sequelize.STRING,
      },
      no_of_views: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('youtubes');
  },
};
