// 'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_types', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identifier: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image_url: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('master_types');
  },
};
