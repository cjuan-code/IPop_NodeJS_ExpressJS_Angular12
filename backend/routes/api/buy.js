const express = require('express');
const router = express.Router();
const buyController = require('../../controllers/buyController');
var auth = require('../auth');

router.post('/', auth.required, buyController.buyItem);

module.exports = router;