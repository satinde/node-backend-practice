'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'email', 'userEmail');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Users', 'userEmail', 'email');
  }
};
