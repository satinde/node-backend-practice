'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserDetail extends Model {
    static associate(models) {
      // Define the One-to-One relationship
      UserDetail.belongsTo(models.User, {
        foreignKey: 'userId', // Foreign key in the UserDetail table
        as: 'user', // Alias to access User
        onDelete: 'CASCADE', // Delete UserDetail if User is deleted
        onUpdate: 'CASCADE' // Update UserDetail if User is updated
      });
    }
  }
  UserDetail.init({
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    userId:DataTypes.INTEGER,
    addressOne:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserDetail',
  });
  return UserDetail;
};