const router = require('express').Router()
const AuthController = require('../controllers/user');


router.get('/user', AuthController.getUserDetails);


module.exports = router;