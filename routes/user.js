var express = require('express');
const router = express.Router();

const {userLogin , userSignUp , getUserDetails , userLogout} = require('../controllers/user');

router.post('/login' , userLogin);

router.post('/signup' , userSignUp);

router.post('/getDetails' , getUserDetails);

module.exports = router;
