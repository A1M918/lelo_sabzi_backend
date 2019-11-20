
const express = require('express');
// const app = express();
const router = express.Router();
const authRouter = require('./auth')
const userRouter = require('./user')
const fylakasRouter = require('./fylakas')
// const jwt = require('../helpers/jwt');
const authHelper = require('../helpers/authHelper');


// router.all(jwt)
router.get('/', function (req, res) {
  res.json({ message: "OK" });
});

module.exports = (app)=>{
  
  app.use(authHelper.validateUserRoute())
  app.use(authRouter)
  app.use(userRouter)
  app.use(fylakasRouter)
  return router;
};