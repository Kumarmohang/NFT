'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert('nft_lists', [
      {
        id: 1,
        artwork_id: 1,
        ipfs_hash: '',
        is_enabled: false,
        token_id: '1',
        blockchain_txn_hash: '',
        current_owner_public_key: '',
        current_owner_id: 2,
        network_type: '',
        network_id: 3,
        network_name: '',
        mint_status: '',
        smart_contract_address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        artwork_id: 2,
        ipfs_hash: '',
        is_enabled: false,
        token_id: '2',
        blockchain_txn_hash: '',
        current_owner_public_key: '',
        current_owner_id: 3,
        network_type: '',
        network_id: 3,
        network_name: '',
        mint_status: '',
        smart_contract_address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        artwork_id: 3,
        ipfs_hash: '',
        is_enabled: false,
        token_id: '',
        blockchain_txn_hash: '',
        current_owner_public_key: '',
        current_owner_id: 1,
        network_type: '',
        network_id: 3,
        network_name: '',
        mint_status: '',
        smart_contract_address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        artwork_id: 4,
        ipfs_hash: '',
        is_enabled: false,
        token_id: '',
        blockchain_txn_hash: '',
        current_owner_public_key: '',
        current_owner_id: 1,
        network_type: '',
        network_id: 3,
        network_name: '',
        mint_status: '',
        smart_contract_address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        artwork_id: 5,
        ipfs_hash: '',
        is_enabled: false,
        token_id: '',
        blockchain_txn_hash: '',
        current_owner_public_key: '',
        current_owner_id: 4,
        network_type: '',
        network_id: 3,
        network_name: '',
        mint_status: '',
        smart_contract_address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        artwork_id: 6,
        ipfs_hash: '',
        is_enabled: false,
        token_id: '',
        blockchain_txn_hash: '',
        current_owner_public_key: '',
        current_owner_id: 4,
        network_type: '',
        network_id: 3,
        network_name: '',
        mint_status: '',
        smart_contract_address: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // await queryInterface.sequelize.query(
    //   "SELECT setval('nft_lists_id_seq', max(id)) FROM nft_lists;"
    // );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('nft_lists', null, {});
  },
};
