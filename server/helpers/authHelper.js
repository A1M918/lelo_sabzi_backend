
const Scope = require('../facades/Scope')
const config = require('../../config');

class AuthHelper {


    static validateUserRoute(req, res, next) {
        return async function (req, res, next) {
            const publicRoutes = config.publicRoutes;

            if (publicRoutes.includes(req.path)) {
                next();
                return;
            }

            if(req.headers.authorization == undefined || req.headers.authorization == '' || req.headers.authorization == null){
                const err = new Error(`User not logged in`)
                next(err);
                return err;
            } 

            let scopes = await Scope.getUserScopesByToken({ path: req.path, payload: req.body, access_token: req.headers.authorization })
            scopes = scopes[0]

            if(scopes == undefined || scopes == null) {
                next()
                return;
            }

            const allowedRoutes = scopes.scopes.allowedRoutes;
            if ((allowedRoutes).length) {
                if (allowedRoutes.includes(req.path) || allowedRoutes.includes("*")) {
                    next();
                }
            } else {
                const err = new Error("Route not allowed");
                next(err)
                return;
            }
        }
    }

}

module.exports = AuthHelper;