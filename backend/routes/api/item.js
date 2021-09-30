const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/itemController');

router.post('/', itemController.createItem);
router.get('/', itemController.getItems);
// router.put('/:id', itemController.updateItem);
router.get('/:id', itemController.getItem);
router.delete('/:id', itemController.removeItem);

module.exports = router;