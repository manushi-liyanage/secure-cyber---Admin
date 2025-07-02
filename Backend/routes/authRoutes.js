const express = require('express')
const {registerUser , loginUser} = require('../controllers/authController');
const {body} = require('express-validator')

const router = express.Router()




router.post('/register', registerUser);

router.post('/login', loginUser);

module.exports = router;