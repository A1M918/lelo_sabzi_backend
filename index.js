require('rootpath')();

require('dotenv').config();

const express = require('express');
const app = express();
 
const server = require('./server/server')(app);

const port = process.env.NODE_ENV === 'production' ? 80 : process.env.port;

app.listen(port, function () {
  console.log('Server listening on port ' + port);
});