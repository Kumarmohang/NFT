'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collection_likes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      collection_id: {
        type: Sequelize.UUID,
        references: {
          model: 'user_collections',
          key: 'id',
        },
      },
      user_public_key: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      is_enabled: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('collection_likes');
  },
};
