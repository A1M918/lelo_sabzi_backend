
const fylakasFacades = require('../facades/Fylakas');

class FylakasController {

  static async logCheckInData(req, res, next){
    await fylakasFacades.logCheckIn(req.body)
      .then(response => res.json({ data: response }))
      .catch(err => next(err));
  }
  static async logCheckOutData(req, res, next){
    await fylakasFacades.logCheckOut(req.body)
      .then(response => res.json({ data: response }))
      .catch(err => next(err));
  }
}

module.exports = FylakasController;