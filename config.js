
module.exports = {
  dbConfig: {
    uri :"mongodb://localhost:27017/",
    db : "Dradus"
  },
  secrete: 'itsMyServerBro!',
  publicRoutes: [
    '/',
    '/login',
    '/registerUser',
    '/about',
    '/contact'
  ]
}