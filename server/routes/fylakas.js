const router = require('express').Router()
const FylakasController = require('../controllers/fylakas');


router.post('/fylakas', FylakasController.logIncomingData);


module.exports = router;