
const fylakasFacades = require('../facades/Fylakas');

class FylakasController {

  static async logIncomingData(req, res, next){
    const response = await fylakasFacades.logAction(req.body);
    await res.json({ data: response });
  }
}

module.exports = FylakasController;