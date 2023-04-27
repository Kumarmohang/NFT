// 'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('marketplace_sell_orders', [
      {
        id: 1,
        nft_id: 1,
        artwork_id: 1,
        seller_public_key: '0x3oq2ie398y38ndsoq929u2',
        seller_id: 1,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 0.1,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nft_id: 2,
        artwork_id: 3,
        seller_public_key: '0x3wkidq98763nodx98q0nx',
        seller_id: 2,
        marketplace_publish_datetime: new Date('2022-03-01T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 0.2,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nft_id: 2,
        artwork_id: 3,
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        seller_id: 3,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 0.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nft_id: 1,
        artwork_id: 1,
        seller_public_key: '0x3oq2ie398y38ndsoq929u2',
        seller_id: 3,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'active',
        status_reason: '',
        txn_value: 0.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nft_id: 2,
        artwork_id: 3,
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        seller_id: 4,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 0.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        nft_id: 2,
        artwork_id: 3,
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        seller_id: 4,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 10.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        nft_id: 4,
        artwork_id: 4,
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        seller_id: 4,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 8.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        nft_id: 5,
        artwork_id: 5,
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        seller_id: 4,
        marketplace_publish_datetime: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        txn_value: 7.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    // await queryInterface.sequelize.query(
    //   "SELECT setval('marketplace_sell_orders_id_seq', max(id)) FROM marketplace_sell_orders;"
    // );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('marketplace_sell_orders', null, {});
  },
};
