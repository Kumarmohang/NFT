'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('wallet_extensions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      identifier: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      is_popular: {
        type: Sequelize.BOOLEAN
      },
      is_enabled: {
        type: Sequelize.BOOLEAN
      },
      order: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('wallet_extensions');
  }
};