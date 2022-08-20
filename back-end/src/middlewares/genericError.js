const httpStatus = require('http-status-codes').default;

module.exports = (err, _req, res, _next) => {
  if (err.httpStatus) return res.status(err.httpStatus).json({ message: err.message });

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
};