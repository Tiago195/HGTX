const Joi = require('joi').extend(require('@joi/date'));
const generateError = require('../utils/generateError');
const httpStatus = require('http-status-codes').default;

const schemaNewUser = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().min(11).max(11),
  status: Joi.string().valid('Ativo', 'Pendente', 'Desativado'),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string().min(11).max(11),
  birthDate: Joi.date().format('YYYY-MM-DD'),
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  status: Joi.string().valid('Ativo', 'Pendente'),
  phoneNumber: Joi.string().min(11).max(11),
  birthDate: Joi.date().format('YYYY-MM-DD'),
});

const validateBody = (schema) => (req, res, next) => {
  console.log(schema);
  const { error } = schema.validate(req.body);
  // console.log(error);
  if (error) next(generateError(error.message, httpStatus.BAD_REQUEST));

  next();
};

module.exports = {
  schemaNewUser,
  validateBody,
  schemaUpdateUser
};