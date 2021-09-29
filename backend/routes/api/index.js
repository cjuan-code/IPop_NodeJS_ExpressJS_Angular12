var router = require('express').Router();

router.use('/items', require('./item'));
router.use('/users', require('./user'));

module.exports = router;