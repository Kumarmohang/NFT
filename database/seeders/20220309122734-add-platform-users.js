'use strict';
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('platform_users', [
      {
        id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        public_address: '0x2a5506faEC8346D76AE0A92dD7332191781EFE2b',
        nickname: 'NFTrove user',
        created_on: new Date(),
        is_enabled: false,
        email: 'john@example.com',
        profile_photo: `${process.env.RESOURCES_URL}/assets/nftrove.png`,
        facebook_handle: 'https://www.facebook.com/joe.pb.io',
        twitter_handle: 'https://twitter.com/joe.pb.io',
        instagram_handle: 'https://www.instagram.com/joe.pb.io',
        youtube_handle: 'https://www.linkedin.com/joe.pb.io',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // {
      //   id: 2,
      //   public_address: '0x3oq2ie398y38ndsoq929u2',
      //   nickname: 'John',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'doe@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=32',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 3,
      //   public_address: '0x3wkidq98763nodx98q0nx',
      //   nickname: 'Nick',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'nick@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=59',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 4,
      //   public_address: '0xoq2ie398y38ndsoq929u2',
      //   nickname: 'Kim',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'kim@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=58',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 5,
      //   public_address: '0xncpoq9ynxoq98wb9w8w8',
      //   nickname: 'Lenin',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'lenin@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=52',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 6,
      //   public_address: '0xn6poq9ynxoq98wb9w8w8',
      //   nickname: 'Rahul',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'rahul@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=57',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 7,
      //   public_address: '0xn7poq9ynxoq98wb9w8w8',
      //   nickname: 'Naman',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'naman@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=51',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 8,
      //   public_address: '0xn8poq9ynxoq98wb9w8w8',
      //   nickname: 'Harshil',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'harshil@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=12',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
      // {
      //   id: 9,
      //   public_address: '0xn9poq9ynxoq98wb9w8w8',
      //   nickname: 'Susheel',
      //   created_on: new Date(),
      //   is_enabled: true,
      //   email: 'susheel@example.com',
      //   profile_photo: 'https://picsum.photos/200/300/?random=42',
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // },
    ]);

    // await queryInterface.sequelize.query(
    //   "SELECT setval('platform_users_id_seq', max(id)) FROM platform_users;"
    // );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('platform_users', null, {});
  },
};
