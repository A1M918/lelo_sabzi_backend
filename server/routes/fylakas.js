const router = require('express').Router()
const FylakasController = require('../controllers/fylakas');


router.post('/fylakas/in', FylakasController.logCheckInData);
router.post('/fylakas/out', FylakasController.logCheckOutData);


module.exports = router;