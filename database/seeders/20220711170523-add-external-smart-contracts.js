const { uuid } = require('uuidv4');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('external_smart_contracts', [
      {
        id: uuid(),
        blockchain_technology: 'Ethereum',
        createdAt: new Date(),
        updatedAt: new Date(),
        smart_contract_address: '0x3D1c398BaeD156BB089C9756696CEf1FB0De8a3b',
        address_type: 'ERC-721',
        asset_name: 'Decentraland LAND',
        asset_symbol: 'LAND',
        added_by: 'platform',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('external_smart_contracts', null, {});
  },
};
