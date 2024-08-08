'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('UserDetails', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false, // Modify as necessary based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserDetails', 'userId');
  }
};
