const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
var auth = require('../auth');

router.get('/', auth.required, userController.loadUser);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/update', auth.required, userController.updateUser);
router.post('/follow', auth.required, userController.follow);
router.delete('/follow/:username', auth.required, userController.unfollow);

module.exports = router;