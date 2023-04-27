// 'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nft_likes', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      nft_id: {
        type: Sequelize.UUID,
        // references : 'user_artwork',
        // referenncesKey : 'id'
        references: {
          model: 'nft_lists',
          key: 'id',
        },
      },
      user_public_key: {
        type: Sequelize.STRING,
        // references : 'platform_users',
        // referenncesKey : 'public_address'
        // references: {
        //   model: 'platform_users',
        //   key: 'id',
        // },
      },
      user_id: {
        type: Sequelize.UUID,
        // references : 'platform_users',
        // referenncesKey : 'id'
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
  async down(queryInterface) {
    await queryInterface.dropTable('nft_likes');
  },
};
