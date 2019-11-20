
const authFacades = require('../facades/Auth');

class AuthController {
    static async login(req, res, next) {
        const userData = req.body
        return await authFacades.login(userData, res).catch(err=>{console.error(err); next(new Error('Failed to Login User')) });
      }

    static async register(req, res, next){
      const  {username, password, grant_type, client_id, client_secret, name, email, designation} = req.body
      return await authFacades.register({username, password, grant_type, client_id, client_secret, name, email, designation}, res).catch(err=>{ console.error(err); next(new Error('Failed to Register User')) })
    }

}

module.exports = AuthController;