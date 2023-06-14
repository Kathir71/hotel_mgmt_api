
const Hotel = require("../models").Hotel;
const Room = require("../models").Room;
const {Op} = require("sequelize");
const hotelCreate = async (req, res) => {
  try {
    const { name, address , roomInformation} = JSON.parse(req.body.hotelInfo);
    const files = req.files;
    console.log("FILESSS")
    console.log(req.files);
    console.log(req.body.roomCollection);
    const newHotel = await Hotel.create({
      name: name.toUpperCase(),
      address: address.toUpperCase(),
    });
    let sNumber = 1;
      roomInformation.forEach((room) => {
        room['startingNumber'] = sNumber;
        sNumber += room.numberAvailable;
      })
    for (let i = 0 ; i < roomInformation.length ; i++){
      const room = roomInformation[i];
      console.log(room);
      const base64 = files[i].buffer.toString("base64");
      const newRoom = await Room.create({
        hotelId:newHotel.id,
        roomType:room.roomType,
        price:room.price,
        numberAvailable:room.numberAvailable,
        startRoomNum: room.startingNumber,
        image:base64,
      })
    }
    res.status(200).send({
      hotelId:newHotel.id
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({msg:"Internal Server Error "});
  }
};

const fetchHotels = async (req, res) => {
  try {
    let { query } = req.body;
    query = query.toUpperCase();
    const hotels = await Hotel.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            address: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    });
    res.json(hotels);
  } catch (err) {
   console.log(err);
   res.status(500).send({msg:"Internal server error."})
  }
};

const getHotelDetails = async (req , res , next) => {
    try{
        const {hotelId } = req.body;
        const rooms = await Room.findAll({
            where:{
                hotelId:hotelId,
            }
        });
        res.json(rooms);
    }
    catch(err){
      console.log(err);
      res.status(500).send({msg:"Internal server error."})
    }
}


module.exports = {
    hotelCreate,
    fetchHotels,
    getHotelDetails,
};