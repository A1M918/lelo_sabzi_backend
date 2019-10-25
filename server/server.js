const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/globalErrorHandler');
const logger = require('morgan');
const helmet = require('helmet');
const oAuth2Service = require('./authentication/OAuth2Service.js').getInstance();
// morgan(':method :url :status :res[content-length] - :response-time ms');
module.exports = (app) => {
  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('dev')); // Morgan options to log every request
  // use JWT auth to secure the api
  app.use(jwt());

  app.all('/oauth/token', oAuth2Service.obtainToken);
  app.use(oAuth2Service.authenticateRequest);

  const routes = require('./routes');
  routes()(app); // passing `app` object into routes closure.
  app.use(routes);
  
  app.use(errorHandler);
}