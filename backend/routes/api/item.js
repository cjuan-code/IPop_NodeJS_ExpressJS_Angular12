const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/itemController');
var auth = require('../auth');

router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
router.get('/pag', itemController.getItemsPag);
// router.put('/:id', itemController.updateItem);
router.get('/:id', auth.optional, itemController.getItem);
router.delete('/:id', itemController.removeItem);
router.get('/cat/:id', itemController.getItemsByCat);
router.post('/fav', auth.required , itemController.favorite);
router.delete('/fav/:slug', auth.required, itemController.unfavorite);
router.post('/comment', auth.required, itemController.createComment);
router.delete('/comment/:commentId/:slug/:reviewId', auth.required, itemController.deleteComment);

module.exports = router;