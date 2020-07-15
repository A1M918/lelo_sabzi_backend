require('rootpath')();

const express = require('express');
const app = express();
const config = require('./config')

const mongo = require('mongo-models')

// const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const port = process.env.PORT ? process.env.PORT : 4000;

mongo.connect(config.dbConfig, { useNewUrlParser: true, useUnifiedTopology: true })
.then((data) => {
  const server = require('./server/server')(app);
  app.listen(port, function () {
  console.log('Server listening on port ' + port);
});
}).catch(err => {
  console.log("Failed to connect to DB:", err);
  process.exit();
});







