module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('external_smart_contracts', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      smart_contract_address: {
        type: Sequelize.STRING,
      },
      address_type: {
        type: Sequelize.STRING,
      },
      blockchain_technology: {
        type: Sequelize.STRING,
      },
      asset_name: {
        type: Sequelize.STRING,
      },
      asset_symbol: {
        type: Sequelize.STRING,
      },
      added_by: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('external_smart_contracts');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
