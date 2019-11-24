const router = require('express').Router()
const FylakasController = require('../controllers/fylakas');


router.post('/fylakas/in', FylakasController.logCheckInData);
router.post('/fylakas/out', FylakasController.logCheckOutData);
router.post('/fylakas/bs', FylakasController.logBreakStartEndData);
router.post('/fylakas/be', FylakasController.logBreakStartEndData);
router.post('/fylakas/hello', FylakasController.registerMe);


module.exports = router;