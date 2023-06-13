const Hotel = require("../models").Hotel;
const User = require("../models").User;
const Booking = require("../models").Booking;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userSignUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exisitingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (exisitingUser) {
      res.status(405).send({msg:"User already exists"});
      return;
    }
    const hashed = bcrypt.hashSync(password, saltRounds);
    const newUser = await User.create({
      email: email,
      password: hashed,
      name: name,
    });
    res.json({
        id:newUser.id,
        email:newUser.email,
        name:newUser.name
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exisitingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!exisitingUser) {
      res.status(405).send({ msg: "User does not exist" });
      return;
    }
    const passwordRes = bcrypt.compareSync(password, exisitingUser.password);
    if (passwordRes) {
      res.status(200).json({
        email: exisitingUser.email,
        name: exisitingUser.name,
        id: exisitingUser.id,
      });
    } else {
      res.status(405).send({ msg: "Incorrect Password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

const userLogout = async (req, res) => {
  console.log("Logged out");
  delete req.session.valid;
  delete req.session.userData;
  res.redirect("http://localhost:3000/");
};

const getUserDetails = async (req, res, next) => {
  try {
    const {id} = req.body;
    const bookedTickets = await Booking.findAll({
      where: {
        userId: id,
      },
    });
    const userDetails = await User.findByPk(id);
    res.json({
        ticketHistory: bookedTickets,
        userDetails: userDetails,
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
module.exports = {
  userLogin,
  userSignUp,
  userLogout,
  getUserDetails,
};
