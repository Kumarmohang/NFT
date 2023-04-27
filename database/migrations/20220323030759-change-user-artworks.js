// 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('user_artworks', 'collection_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'user_collections',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('user_artworks', 'collection_id');
    // await queryInterface.dropTable('user_artworks');
  },
};
