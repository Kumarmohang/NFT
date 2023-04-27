// 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('notifications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'platform_users',
          key: 'id',
        },
      },
      notification_text: {
        type: Sequelize.STRING,
      },
      createdAt: { type: Sequelize.DATE },
      category: {
        type: Sequelize.STRING,
        values: ['seller', 'buyer', 'events', 'general'],
      },
      status: {
        type: Sequelize.STRING,
        values: ['pending', 'view', 'deleted'],
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('notifications');
  },
};
