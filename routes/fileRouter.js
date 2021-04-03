const express = require('express');
const router = express.Router();

const { fileController, getFileController } = require('../controllers/fileController');

router.post('/uploadFile', fileController);
router.post('/getFile', getFileController);

module.exports = router;