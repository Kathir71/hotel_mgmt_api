'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   static associate(models) {
      this.hasOne(models.Booking , {through:'userId'})
    }
  }
  User.init({
    name:DataTypes.STRING,
    email: DataTypes.STRING,
    password:DataTypes.STRING,
  }, {
    sequelize,
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    modelName: 'User',
    tableName:'User',
  });
  return User;
};