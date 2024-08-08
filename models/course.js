'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      // Define association here
      Course.belongsTo(models.User, {
        foreignKey: 'userId', // Foreign key in the Course table
        as: 'user', // Alias to access User
        onDelete: 'CASCADE', // Delete Courses associated with User if User is deleted
        onUpdate: 'CASCADE' // Update userId in Courses if User is updated
      });
    }
  };
  Course.init({
    courseName: DataTypes.STRING,
    courseCode: DataTypes.STRING,
    courseDetail: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE // Add deletedAt field for Paranoid behavior
  }, {
    sequelize,
    paranoid: true, // Enable Paranoid mode
    timestamps: true, // Ensure timestamps are maintained
    modelName: 'Course',
  });
  return Course;
};
