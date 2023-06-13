'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
   static associate(models) {
    this.belongsTo(models.Hotel , {through:'hotelId'})
    }
  }
  Room.init({
    hotelId:DataTypes.INTEGER,
    roomType:DataTypes.STRING,
    price:DataTypes.FLOAT,
    numberAvailable:DataTypes.INTEGER,
    startRoomNum:DataTypes.INTEGER,
    image:DataTypes.STRING,
  }, {
    sequelize,
    timestamps:false,
    updatedAt:false,
    createdAt:false,
    modelName: 'Room',
    tableName:'Room',
  });
  Room.removeAttribute('id');
  return Room;
}