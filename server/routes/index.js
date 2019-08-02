
const jwt = require('jsonwebtoken');
const secrete = require('./../../config').secrete;

function routes(router) {
  return function (router) {
    router.get('/', function (req, res) {
      res.json({ message: "OK" });
    });

    router.post('/login', function (req, res) {
      let signedJWT = jwt.sign({ message: 'ok'}, secrete);
      res.json({ authToken: signedJWT });
    });
   
    router.post('/user', function (req, res) {
      res.json({ message: "OK" });
    });
  }
}

module.exports = routes;