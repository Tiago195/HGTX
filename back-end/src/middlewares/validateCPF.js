const generateError = require('../utils/generateError');
const isValidCPF = require('../utils/isValidCPF');
const httpStatus = require('http-status-codes').default;

const validateCPF = (req, res, next) => {
  const { cpf } = req.body;
  const isValid = isValidCPF(cpf);

  if (!isValid) next(generateError('Invalid document format ', httpStatus.BAD_REQUEST));

  next();
};

module.exports = validateCPF;