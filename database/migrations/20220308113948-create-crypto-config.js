'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('crypto_configs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      blockchain_technology: {
        type: Sequelize.STRING
      },
      is_enabled: {
        type: Sequelize.BOOLEAN
      },
      current_rate_usd: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('crypto_configs');
  }
};