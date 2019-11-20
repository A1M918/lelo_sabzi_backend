
const fylakasFacades = require('../facades/Fylakas');

class FylakasController {

  static async getIncomingData(req, res, next){
    console.log("---------------------------")
    console.log(req.body);
    console.log("---------------------------")
    await res.json({data: req.body})
  }
}

module.exports = FylakasController;