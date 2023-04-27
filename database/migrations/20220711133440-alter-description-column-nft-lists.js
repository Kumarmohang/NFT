module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('nft_lists', 'description', {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('nft_lists', 'description', {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
