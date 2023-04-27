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
    await queryInterface.bulkInsert('user_artworks', [
      {
        id: '999dd2a4-a17a-46ee-9df5-af5b804d3524',
        name: 'Meka #431',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://lh3.googleusercontent.com/hvTmwwyEBfjavGoOXXtCmsD8cBsBX0sel-zj5LaG7dAZl363viWY_5WkslAqRPnQfwwHu5aEMtiz79Oy2RCDv4HcueALSxyavEGJUqY=w286',
        collection_id: 1,
        is_enabled: false,
        no_of_likes: 312,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '171060a4-1789-4037-9852-f0660242b6a9',
        name: 'Astro #298',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://lh3.googleusercontent.com/QwnzpXilALJ-PR_g3s7CWJiTVsPt1kRB0x-QXQq0XCigi2cXDLC-dP7fdN-AQgbFdpE1XNGj6aqok71y6kPXmJF0EXk12WUcuD7lJg=w286',
        collection_id: 2,
        is_enabled: false,
        no_of_likes: 51,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e02684f8-7cbb-43f8-a415-017c740a1c67',
        name: 'Meka #423',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://public.nftstatic.com/static/nft/zipped/92b1104b1c2b4df0a016005cf6b82bd1_zipped.png',
        collection_id: 1,
        is_enabled: false,
        no_of_likes: 150,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '0e8b0bd1-578d-4002-8a41-06fb2d72f651',
        name: 'Long Lost #8845',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://public.nftstatic.com/static/nft/zipped/265e6132761143a5b50d17ac1fb6369a_zipped.png',
        collection_id: 3,
        is_enabled: false,
        no_of_likes: 212,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e602e801-517d-4e1c-b811-a3b33c3cb1cb',
        name: 'Somium #6785',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://public.nftstatic.com/static/nft/zipped/14597d5e775c4230bd9fdf2115f00642_zipped.jpeg',
        collection_id: 4,
        is_enabled: false,
        no_of_likes: 90,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3aa95843-97a5-4719-9beb-70108f761d3b',
        name: 'Kongz #7564',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://lh3.googleusercontent.com/Ij6z6DEeNBwyY6OQbDU9-b-Q_cZOjDuQ3_dciogEWlxAm5yvZw7VyUvXYFb1XM0TinnwF66oE8npL18-LYhufkfH9ACvJL99_1nvhg=w286',
        collection_id: 5,
        is_enabled: false,
        no_of_likes: 159,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '569b1bf6-968b-4630-b1af-1437de0b8035',
        name: 'Vayner #2345',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://lh3.googleusercontent.com/iLWB3942A4vjDU_j5vWacO_A-5j-WEy_rD7wPy755Xa1ocBKkXWTG7Ln9-xDPuThur5WC2rzW3YYkNrpjrEDWKPJNrnQZta8FDNyiQ=w286',
        collection_id: 6,
        is_enabled: false,
        no_of_likes: 112,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '56cc90ad-815c-4e92-b785-f048147bea68',
        name: 'Fellaz #123',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://lh3.googleusercontent.com/WZByOGSZQiJLpvFc9KGmvFJR97xAvZdrLk4yfwJ8efxdPuE2muI0PMXfmbXv4fSb9as4ThF8kWtp1n__tABVP5HzDR8iEXjFxAvHvA=w286',
        collection_id: 8,
        is_enabled: false,
        no_of_likes: 154,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f5354b60-640e-40a3-80e2-edb89046da25',
        name: 'Dented #563',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://lh3.googleusercontent.com/hI4ExiCctxTpKpg9DcCnnhE9EAgPF0Y5AfrzAxJgFnnIBQX0Or0g6aHZ8pR3cG5e6OnSUc5RWti_lAz5n-mCNDkhbkcBtjFi6POEDA=w286',
        collection_id: 7,
        is_enabled: false,
        no_of_likes: 253,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '9238e9d1-77bd-4cc0-974d-0c8f667f055a',
        name: 'Metroverse #0987',
        type_id: 'a843adc4-9ff2-4ccf-9d45-b68cb58e77db',
        description: '',
        external_link: '',
        file_url:
          'https://public.nftstatic.com/static/nft/zipped/31f3cc35c6eb4a49be02bf8391afde52_zipped.png',
        collection_id: 9,
        is_enabled: false,
        no_of_likes: 311,
        user_id: '5bdd1e00-d161-4706-8edb-4bac99d67d62',
        creator_public_address: '',
        smart_contract_address: '',
        mime_type: 'image/png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    // await queryInterface.sequelize.query(
    //   "SELECT setval('user_artworks_id_seq', max(id)) FROM user_artworks;"
    // );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_artworks', null, {});
  },
};
