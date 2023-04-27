'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('landing_page_stats', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      artworks_count: {
        type: Sequelize.INTEGER
      },
      auctions_count:{
        type: Sequelize.INTEGER
      },
      artist_count:{
        type: Sequelize.INTEGER
      },
      total_transactions_count:{
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
    await queryInterface.dropTable('landing_page_stats');
  }
};