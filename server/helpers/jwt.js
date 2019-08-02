const expressJwt = require('express-jwt');
const config = require('./../../config');


function jwt() {
  const secret = config.secrete;
  return expressJwt({ secret }).unless({
    path: config.publicRoutes // public routes that don't require authentication      
  });
}

module.exports = jwt;