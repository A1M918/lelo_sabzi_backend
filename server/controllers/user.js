
const userFacades = require('../facades/User');

class UserController {

  static async getUserDetails(req, res, next){
    
    const response = await userFacades.getUserDetails(req.headers).catch(err=>{console.error(err); next(err) })
    await res.json({data: response})
  }
}

module.exports = UserController;