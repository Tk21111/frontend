const express = require('express');
const router = express.Router();
const authController = require('../controller/Hrefresh');

router.post('/', authController.Hrefresh);

module.exports = router;