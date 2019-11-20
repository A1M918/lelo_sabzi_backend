const router = require('express').Router()
const FylakasController = require('../controllers/fylakas');


router.post('/fylakas', FylakasController.getIncomingData);


module.exports = router;