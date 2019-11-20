const expressJwt = require('express-jwt');
const config = require('./../../config');
const User = require('../facades/User');
const Auth = require('../facades/Auth');

async function jwt(req, res, next) {

  let Bearer_Token;
  if (req.hasOwnProperty('headers')) {
    Bearer_Token = (req.headers.authorization) ? (req.headers.authorization).split('Bearer ')[1] : null
  }else throw new Error("User not authorize");
  let secret = null;
  // next();
  return await Auth.findSecretByToken(Bearer_Token, res)
    .then(async secrets => {
      if (secrets.length) {
        const secret = secrets[0].secrete.client_secret;
        await expressJwt({ secret }).unless({
          path: config.publicRoutes // public routes that don't require authentication      
        });
        // await next();
      }else{
        return await expressJwt({ secret: config.secrete }).unless({
          path: config.publicRoutes // public routes that don't require authentication      
        });
        // await next();
      }
    });
}

module.exports = jwt;