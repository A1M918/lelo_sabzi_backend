

const router = require('express').Router()
const authController = require('../controllers/auth');


router.post('/login', authController.login);
router.post('/registerUser', authController.register);

module.exports = router;