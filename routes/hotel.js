const express = require("express");
const router = express.Router();
const upload = require("multer")();
const {
  hotelCreate,
  fetchHotels,
  getHotelDetails,
} = require("../controllers/hotel");

const { validate } = require("../validators/index");

const {
  hotelCreateChain,
  hotelSearchChain,
  hotelDetailsChain,
} = require("../validators/hotelValidator");

router.post(
  "/create",
  upload.array("roomCollection"),
  (req, res, next) => {
    // console.log("hii");
    // console.log(req);
    console.log(req.body);
    // req.body.hotelInfo = JSON.parse(req.body.hotelInfo);
    // req.body.roomCollection = JSON.parse(req.body.roomCollection);
    // console.log(req);
    next();
  },
//   validate(hotelCreateChain),
  hotelCreate,
);

router.post("/search", validate(hotelSearchChain), fetchHotels);

router.post("/getDetails", validate(hotelDetailsChain), getHotelDetails);

module.exports = router;
