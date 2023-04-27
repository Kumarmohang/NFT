'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_sessions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'platform_users',
          key: 'id'
        },
        // references : 'platform_users',
        // referenncesKey : 'id'
      },
      session_tokens:{
        type: Sequelize.STRING
      },
      expiry_time:{
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_sessions');
  }
};