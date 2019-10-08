const dotenv = require('dotenv');
dotenv.config();

const development = {
  DB: {
    username: 'root',
    password: null,
    database: 'enew',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false
  }
}

// process.env['production'].DB =  {
//   username: 'root',
//   password: null,
//   database: 'enew',
//   host: '127.0.0.1',
//   dialect: 'mysql',
//   operatorsAliases: false
// }

module.exports = {
  secrete: process.env.secrete,
  DB : (process.env.NODE_ENV === 'production') ? process.env.production.DB : development.DB,
  publicRoutes: [
    '/',
    '/login',
    '/about',
    '/contact'
  ]
}