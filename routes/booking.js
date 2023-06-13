const express = require('express');
const router = express.Router();

const { 
  checkRoomAvailability,
  bookRoom,
} = require("../controllers/booking");

router.post("/checkAvailability" , checkRoomAvailability);

router.post("/book" , bookRoom);

module.exports = router;