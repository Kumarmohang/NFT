'use strict';
const { uuid } = require('uuidv4');


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

    return queryInterface.bulkInsert('master_types', [
      {
        id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        name: 'Artwork',
        identifier: 'digital_art',
        description: 'Moon NFT',
        image_url:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/04/NFT.jpeg.jpg',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f1fc4806-061d-47d2-abdd-25302a08c03c',
        name: 'Video',
        identifier: 'video',
        description: 'CryptoPunk',
        image_url:
          'https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f985529e-5098-46fa-b882-7fc8c9a2b96a',
        name: 'Audio',
        identifier: 'audio',
        description: 'Audio',
        image_url:
          'https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'fa6c7bc7-2e18-44f4-a1cf-8d27d14bbd51',
        name: 'File',
        identifier: 'file',
        description: 'File',
        image_url:
          'https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '1b5e6b88-88c1-4d6b-91e3-fac83737260d',
        name: 'Metaverse',
        identifier: 'virtual_world',
        description: 'CryptoPunk',
        image_url:
          'https://static01.nyt.com/images/2021/03/12/arts/11nft-auction-cryptopunks-print/11nft-auction-cryptopunks-print-mobileMasterAt3x.jpg',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete('master_types', null, {});
  },
};
