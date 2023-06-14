const { query, validationResult, body } = require("express-validator");

const hotelCreateChain = [
    body("hotelInfo.name").trim().notEmpty().withMessage("Name cannot be empty").escape(),
    body("hotelInfo.address").trim().notEmpty().withMessage("Address cannot be empty").escape(),
]

const hotelSearchChain = [
    body("query").trim().notEmpty().withMessage("Query cannot be empty").escape(),
]

const hotelDetailsChain = [
    body("hotelId").isDecimal().withMessage("Invalid hotel id").escape(),
]

module.exports = {
    hotelCreateChain,
    hotelSearchChain,
    hotelDetailsChain,
};