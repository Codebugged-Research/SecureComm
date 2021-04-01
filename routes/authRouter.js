const express = require('express');
const router = express.Router();

const {
    signUpController,
    loginController
} = require('../controllers/authController.js');

router.post('/signUp', signUpController);
router.post('/login', loginController);

module.exports = router;