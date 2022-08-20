const generateError = require('../utils/generateError');
const jwt = require('../utils/jwt');
const httpStatus = require('http-status-codes').default;

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;

  if (!token) next(generateError('Token not found', httpStatus.NOT_FOUND));

  const { data } = jwt.decode(token);

  if (!data) next(generateError('Token must be a valid', httpStatus.UNAUTHORIZED));

  req.user = data;
  next();
};