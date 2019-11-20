require('rootpath')();

const express = require('express');
const app = express();

const mongo = require('mongo-models')
 
const server = require('./server/server')(app, mongo);

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});