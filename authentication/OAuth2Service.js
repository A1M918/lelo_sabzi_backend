const debug = require('debug')('OAuth2Service');
const OAuth2Model = require('../models/OAuth2Model.js').getInstance();
const OAuth2Server = require('oauth2-server'),     //Represents an OAuth2 server instance.
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;
let instance;
/**
 * Instantiates OAuth2Server using the supplied model.
 */
const oAuth2 = new OAuth2Server({
  model: OAuth2Model,
  accessTokenLifetime: 86500,
  allowBearerTokensInQueryString: true
});
/**
 * Creating constructor
 */
class OAuth2Service {

  /**
   * Define the shared properties and methods using the prototype
   */

  /**
   * Obtaine OAuth token with Basic Authentication
   */
  static obtainToken(req, res) {
    const request = new Request(req);
    const response = new Response(res);
    return oAuth2.token(request, response)
      .then(function (token) {
        debug("obtainToken: token %s obtained successfully", token);
        res.json(token);
      }).catch(function (err) {

        res.status(err.code || 500).json(err);
      });
  }
  /**
   * Authenticates a request.
   */
  static authenticateRequest(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    return oAuth2.authenticate(request, response)
      .then(function (token) {
        debug("the request was successfully authenticated")
        next();
      }).catch(function (err) {

        res.status(err.code || 500).json(err);
      });
  }
}
/**
 * Export an Instance
 */
module.exports = {
  getInstance: function (namespace, opts, backupService) {
    if (!instance) {
      instance = new OAuth2Service(namespace, opts, backupService);
    }

    return instance;
  }
};