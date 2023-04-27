module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('platform_users', {
      id: {
        // allowNull: false,
        // autoIncrement: true,
        // primaryKey: true,
        // type: Sequelize.INTEGER,
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      public_address: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      nickname: {
        type: Sequelize.STRING,
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      is_enabled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      profile_photo: {
        type: Sequelize.STRING,
      },
      cover_photo: {
        type: Sequelize.STRING,
      },
      about_me: {
        type: Sequelize.STRING,
      },
      facebook_handle: {
        type: Sequelize.STRING,
      },
      instagram_handle: {
        type: Sequelize.STRING,
      },
      youtube_handle: {
        type: Sequelize.STRING,
      },
      twitter_handle: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      is_profile_complete: {
        type: Sequelize.BOOLEAN,
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
  async down(queryInterface) {
    await queryInterface.dropTable('platform_users');
  },
};
