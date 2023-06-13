const express = require('express');
const router = express.Router();
const upload = require('multer')();
const {
    hotelCreate,
    fetchHotels,
    getHotelDetails,
} = require ("../controllers/hotel");

router.post("/create" , upload.array('roomCollection'),hotelCreate);

router.post("/search" , fetchHotels);

router.post("/getDetails" , getHotelDetails);

module.exports = router;