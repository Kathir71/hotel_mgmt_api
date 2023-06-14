var express = require('express');
const router = express.Router();
const {validate} = require('../validators/index');
const {
  signupChain,
  loginChain,
} = require('../validators/userValidator');

const {userLogin , userSignUp , getUserDetails } = require('../controllers/user');

router.post('/login' , validate(loginChain) , userLogin);

router.post('/signup' , validate(signupChain) , userSignUp);

router.post('/getDetails' , getUserDetails);

module.exports = router;
