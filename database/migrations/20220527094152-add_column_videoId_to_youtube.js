'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('youtubes', 'video_id', {
      type: Sequelize.STRING,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('youtubes', 'video_id');
  },
};
