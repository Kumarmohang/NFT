const { uuid } = require('uuidv4');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert('master_themes', [
      {
        id: 'd61f4f5b-0bf9-41ca-9374-aa5470aac5e6',
        name: 'Digital Art',
        description: 'NFT with digital art',
        image_url:
          'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/04/NFT.jpeg.jpg',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '83173c6c-89fc-4fe9-afb0-32018e610c98',
        name: 'Sports',
        description: 'NFT related to sports',
        image_url:
          'https://mobii.com/wp-content/uploads/2021/08/The-sports-NFT-boom-keeps-rising.jpg:',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'df6be5e7-560c-4912-9830-66e618eacfa8',
        name: 'Game',
        description: 'NFT related to games',
        image_url:
          'https://venturebeat.com/wp-content/uploads/2021/10/nft.jpg?w=1200&strip=all',
        is_enabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('master_themes', null, {});
  },
};
