'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
   static associate(models) {
      this.hasOne(models.Booking , {through:'hotelId'})
    }
  }
  Hotel.init({
    name:DataTypes.STRING,
    address: DataTypes.STRING,
    rating:DataTypes.FLOAT,
  }, {
    sequelize,
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    modelName: 'Hotel',
    tableName:'Hotel',
  });
  return Hotel;
}