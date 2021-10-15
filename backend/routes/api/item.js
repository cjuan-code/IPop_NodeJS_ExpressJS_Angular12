const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/itemController');

router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
router.get('/pag', itemController.getItemsPag);
// router.put('/:id', itemController.updateItem);
router.get('/:id', itemController.getItem);
router.delete('/:id', itemController.removeItem);
router.get('/cat/:id', itemController.getItemsByCat);

module.exports = router;