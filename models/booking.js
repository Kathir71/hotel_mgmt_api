'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
   static associate(models) {
    this.belongsTo(models.Hotel , {through:'hotelId'})
    this.belongsTo(models.User , {through:'userId'})
    }
  }
  Booking.init({
    userId:DataTypes.INTEGER,
    hotelId:DataTypes.INTEGER,
    cost:DataTypes.FLOAT,
    roomType:DataTypes.STRING,
    numRoomsBooked:DataTypes.INTEGER,
    startRoomNum:DataTypes.INTEGER,
    checkInDate:DataTypes.DATE,
    checkOutDate:DataTypes.DATE,
  }, {
    sequelize,
    timestamps:false,
    createdAt:false,
    updatedAt:false,
    modelName: 'Booking',
    tableName:'Booking',
  });
  return Booking;
}