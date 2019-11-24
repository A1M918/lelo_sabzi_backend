const router = require('express').Router()
const FylakasController = require('../controllers/fylakas');


router.post('/fylakas/in', FylakasController.logIncomingData);
router.post('/fylakas/out', FylakasController.logIncomingData);


module.exports = router;