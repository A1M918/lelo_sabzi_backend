const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/globalErrorHandler');
const logger = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
// morgan(':method :url :status :res[content-length] - :response-time ms');
module.exports = async (app) => {

  app.use(helmet());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(logger('common')); // Morgan options to log every request
  // use JWT auth to secure the api
  // app.use(jwt);

  app.use(routes(app))

  app.use(errorHandler);
}