const { Op } = require("sequelize");

const Hotel = require("../models").Hotel;
const Room = require("../models").Room;
const User = require("../models").User;
const Booking = require("../models").Booking;

const checkRoomAvailability = async (req, res) => {
  try {
    const { hotelId, roomType ,checkInDate , checkOutDate} = req.body;
    const formatted = new Date(checkInDate);
    const numberBookedInInterval = await Booking.findAll({
      where: {
        hotelId: hotelId,
        roomType: roomType,
        checkOutDate: {
          [Op.gt]: formatted,
        },
      },
    });
    const totalrooms = await Room.findAll({
      attributes: {
        include: ["numberAvailable", "startRoomNum"],
      },
      where: {
        hotelId: hotelId,
        roomType: roomType,
      },
    });
    let booked = 0;
    numberBookedInInterval.forEach((booking) => {
      booked += booking.numRoomsBooked;
    });
    const leftUnbooked =
      totalrooms[0].numberAvailable - booked;
      res.json({
        roomsLeft:leftUnbooked,
      })
  } catch (err) {
    console.log(err);
    res.status(500).send({msg:"Internal server error try again"});
  }
};

const bookRoom = async (req, res) => {
  try {
    const { userId , hotelId, roomType, numRoomsRequired, checkInDate , checkOutDate } =
      req.body;
    const formatted = new Date(checkInDate);
    const numberBookedInInterval = await Booking.findAll({
      where: {
        hotelId: hotelId,
        roomType: roomType,
        checkOutDate: {
          [Op.gt]: formatted,
        },
      },
    });
    const room = await Room.findOne({where:{
      hotelId:hotelId,
      roomType:roomType,
    }});
    const price = room.price;
   
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const a = new Date(checkInDate);
    const b = new Date(checkOutDate);
    const utc1 =  Date.UTC(
      a.getFullYear(),
      a.getMonth(),
      a.getDate()
    );
    const utc2 = Date.UTC(
      b.getFullYear(),
      b.getMonth(),
      b.getDate()
    );
    const difference = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    const totalCost = difference * price * numRoomsRequired;

    //figure out startRoomNum

    let booked = 0;
    numberBookedInInterval.forEach((booking) => {
      booked += booking.numRoomsBooked;
    });
    const startRoomNum = room.startRoomNum + booked;
    const newBooking = await Booking.create({
      userId: userId,
      hotelId: hotelId,
      cost: totalCost,
      roomType: roomType,
      numRoomsBooked: numRoomsRequired,
      startRoomNum: startRoomNum,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
    });
    res.json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(500).send({msg:"Internal Server error try again"});
  }
};

module.exports = {
  checkRoomAvailability,
  bookRoom,
};
