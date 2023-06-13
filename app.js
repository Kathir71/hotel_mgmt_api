var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv-flow').config();
const ejsMate = require('ejs-mate');

const userRouter = require('./routes/user');
const hotelRouter = require('./routes/hotel')
const bookingRouter = require('./routes/booking');
const session = require('express-session');

var app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));
app.use(session({secret:"None" , resave:true , saveUninitialized:true}));


app.use('/user', userRouter);
app.use('/hotel' , hotelRouter);
app.use('/booking' , bookingRouter);


app.listen(process.env.PORT||5000 , () => {
  console.log(`Server running on Port ${process.env.PORT}`)
})



module.exports = app;
