const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./api/routes/cashMachineRoutes');
app.use(bodyParser.json());
// init routes

routes(app);

app.listen(3000, function () {
  console.log('cash machine RESTful API server started on: ' + 3000);
});


