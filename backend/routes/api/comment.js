const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/commentController');

router.get('/:id', commentController.getCommentByID);

module.exports = router;