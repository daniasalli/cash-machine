const calculateBills = require('../../functions/bills').calculate;

postGenerateBills = function (request, response) {
  var total = request.body.total;
  try {
   var billsResult = calculateBills(total);
   response.status(200).send(billsResult);
  } catch(e) {
    response.status(400).send({message: 'Parameter is not a valid number!'});
  }
}

getMachine = function (res) {
  res.status(200).send('Welcome to the cash machine RESTful API');
}

module.exports = {postGenerateBills, getMachine};