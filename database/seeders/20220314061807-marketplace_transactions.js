'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('marketplace_transactions', [
      {
        id: 1,
        nft_id: 1,
        artwork_id: 1,
        buyer_public_key: '0x0q9wdhoq8eg9812989hd9q',
        seller_public_key: '0x3oq2ie398y38ndsoq929u2',
        buyer_id: 1,
        seller_id: 2,
        marketplace_buy_init_time: new Date('2022-03-02T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-03T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 10.1,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        nft_id: 2,
        artwork_id: 3,
        buyer_public_key: '0x3oq2ie398y38ndsoq929u2',
        seller_public_key: '0x3wkidq98763nodx98q0nx',
        buyer_id: 2,
        seller_id: 3,
        marketplace_buy_init_time: new Date('2022-03-01T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-02T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 5.0,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        nft_id: 2,
        artwork_id: 3,
        buyer_public_key: '0x3wkidq98763nodx98q0nx',
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        buyer_id: 3,
        seller_id: 4,
        marketplace_buy_init_time: new Date('2022-03-02T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-04T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 0.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        nft_id: 2,
        artwork_id: 3,
        buyer_public_key: '0x3wkidq98763nodx98q0nx',
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        buyer_id: 3,
        seller_id: 4,
        marketplace_buy_init_time: new Date('2022-03-02T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-04T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 10.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        nft_id: 4,
        artwork_id: 4,
        buyer_public_key: '0x3wkidq98763nodx98q0nx',
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        buyer_id: 3,
        seller_id: 4,
        marketplace_buy_init_time: new Date('2022-03-02T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-04T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 8.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        nft_id: 4,
        artwork_id: 4,
        buyer_public_key: '0x3wkidq98763nodx98q0nx',
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        buyer_id: 3,
        seller_id: 4,
        marketplace_buy_init_time: new Date('2022-03-02T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-04T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 2.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        nft_id: 5,
        artwork_id: 5,
        buyer_public_key: '0x3wkidq98763nodx98q0nx',
        seller_public_key: '0xoq2ie398y38ndsoq929u2',
        buyer_id: 3,
        seller_id: 4,
        marketplace_buy_init_time: new Date('2022-03-02T00:00:00'),
        marketplace_buy_end_time: new Date('2022-03-04T00:00:00'),
        status: 'complete',
        status_reason: '',
        marketplace_sell_record_id: 1,
        txn_value: 7.3,
        txn_symbol: 'ETH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    // await queryInterface.sequelize.query(
    //   "SELECT setval('marketplace_transactions_id_seq', max(id)) FROM marketplace_transactions;"
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('marketplace_transactions', null, {});
  },
};
