const { uuid } = require('uuidv4');
require('dotenv').config();

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
    await queryInterface.bulkInsert('user_collections', [
      {
        id: 'c3016167-9fd0-46e7-a117-8beccb2e2d38',
        name: 'Decentraland Land',
        description: 'Decentraland land parcels',
        logo_url: `${process.env.RESOURCES_URL}/assets/metaverse_land_parcel.webp`,
        cover_photo_url: '',
        public_address: '',
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        no_of_likes: 0,
        no_of_wishlist: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f7a6d106-6a4b-4cfe-9071-8ebee75a583f',
        name: 'Decentraland Wearables',
        description: 'Decentraland wearables',
        logo_url: `${process.env.RESOURCES_URL}/assets/metaverse_wearable.png`,
        cover_photo_url: '',
        public_address: '',
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        no_of_likes: 0,
        no_of_wishlist: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   id: 3,
      //   name: 'The Long Lost',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=82',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 1,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 4,
      //   name: 'Somnium Space',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=150',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 3,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 5,
      //   name: 'CyberKongz',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=147',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 5,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 6,
      //   name: 'VaynerSports',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=111',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 6,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 7,
      //   name: 'Dented Nfts',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=324',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 7,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 8,
      //   name: 'DeadFellaz',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=965',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 8,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 9,
      //   name: 'Metroverse Genesis',
      //   description: 'Unique NFTs Picks',
      //   logo_url: 'https://picsum.photos/200/300/?random=754',
      //   cover_photo_url: '',
      //   public_address: '',
      //   user_id: 9,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]);
    // await queryInterface.sequelize.query(
    //   "SELECT setval('user_collections_id_seq', max(id)) FROM user_collections;"
    // );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_collections', null, {});
  },
};
