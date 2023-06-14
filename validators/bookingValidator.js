const {body} = require("express-validator");

const bookingChain = [
    body("userId").isDecimal().withMessage("Invalid user id").escape(),
    body("hotelId").isDecimal().withMessage("Invalid user id").escape(),
    body("roomType").trim().notEmpty().withMessage("Room type cannot be empty").escape(),
    body("numRoomsRequired").isDecimal().withMessage("Invalid number of rooms").escape(),

];

const availabilityChain = [
    body("hotelId").isDecimal().withMessage("Invalid user id").escape(),
    body("roomType").trim().notEmpty().withMessage("Room type cannot be empty").escape(),
];

module.exports = {
    bookingChain,
    availabilityChain,
};