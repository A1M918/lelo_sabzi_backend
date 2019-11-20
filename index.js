require('rootpath')();

const express = require('express');
const app = express();
const config = require('./config')

const mongo = require('mongo-models')


mongo.connect(config.dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log("Connected to database");
  const server = require('./server/server')(app, mongo);
  app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
}).catch(err => {
  console("Failed to connect to DB:", err);
  process.exit();
});






const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

