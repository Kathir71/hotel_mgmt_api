const express = require('express');
const router = express.Router();

const { 
  checkRoomAvailability,
  bookRoom,
} = require("../controllers/booking");

const {validate} = require("../validators/index");
const {
    bookingChain,
    availabilityChain,
} = require("../validators/bookingValidator");
router.post("/checkAvailability" ,validate(availabilityChain), checkRoomAvailability);

router.post("/book" , validate(bookingChain), bookRoom);

module.exports = router;