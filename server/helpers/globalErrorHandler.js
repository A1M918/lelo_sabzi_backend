module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ error: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ error: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(200).json({
    status: "FAIL",
    error: err.message
  });
}