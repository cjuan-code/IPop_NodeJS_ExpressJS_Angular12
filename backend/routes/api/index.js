var router = require('express').Router();

router.use('/items', require('./item'));
router.use('/users', require('./user'));
router.use('/categories', require('./category'));

module.exports = router;