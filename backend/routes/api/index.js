var router = require('express').Router();

router.use('/items', require('./item'));
router.use('/users', require('./user'));
router.use('/categories', require('./category'));
router.use('/comments', require('./comment'));
router.use('/reviews', require('./review'));
router.use('/buy', require('./buy'));

module.exports = router;