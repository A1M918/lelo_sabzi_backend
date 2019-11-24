
const fylakasFacades = require('../facades/Fylakas');

class FylakasController {

  static async logIncomingData(req, res, next){
    const response = await fylakasFacades.logAction(req.body)
      .then(response => res.json({ data: response }))
      .catch(err => next(err));
  }
}

module.exports = FylakasController;