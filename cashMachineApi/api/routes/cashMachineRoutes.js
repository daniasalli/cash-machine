const cashMachineController = require('./../controllers/cashMachineController');

module.exports = function (app) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // cash machine routes
  app.route('/api/cashMachine')
    .get(cashMachineController.getMachine)
    .post(cashMachineController.postGenerateBills);
}