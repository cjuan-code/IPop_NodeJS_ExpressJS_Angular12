const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');

router.get('/:id', reviewController.getReviewByID);

module.exports = router;