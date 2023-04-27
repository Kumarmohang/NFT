'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('config_stores', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      artwork_type_id: {
        type: Sequelize.UUID,
        references: {
          model: 'master_types',
          key: 'id',
          // deferrable: Deferrable.INITIALLY_IMMEDIATE
        },
      },
      commision:{
        type : Sequelize.DECIMAL
      },
      type: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      is_enabled: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('config_stores');
  }
};