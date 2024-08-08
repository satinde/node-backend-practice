'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define the One-to-One relationship
      User.hasOne(models.UserDetail, {
        foreignKey: 'userId', // Foreign key in the UserDetail table
        as: 'detail', // Alias to access UserDetail
        onDelete: 'CASCADE', // Delete UserDetail if User is deleted
        onUpdate: 'CASCADE' // Update UserDetail if User is updated
      });
      
      // Define the One-to-Many relationship with Course
      User.hasMany(models.Course, {
        foreignKey: 'userId',
        as: 'courses',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    // Add primary key constraint
    primaryKey: true,
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
      }
    }
  });
  return User;
};