'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseName: {
        type: Sequelize.STRING
      },
      courseCode: {
        type: Sequelize.STRING
      },
      courseDetail: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE', // Delete Courses associated with User if User is deleted
        onUpdate: 'CASCADE', // Update userId in Courses if User is updated
        references: {
          model: 'Users', // Name of the referenced table
          key: 'id' // Primary key of the referenced table
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};