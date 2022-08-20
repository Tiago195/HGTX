const Joi = require('joi');
const generateError = require('../utils/generateError');
const httpStatus = require('http-status-codes').default;

const schemaNewUser = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().min(11).max(11),
  password: Joi.string().min(6).required()
});

const schemaUpdateUser = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  status: Joi.string().valid('Ativo', 'Pendente'),
  phoneNumber: Joi.string().min(11).max(11),
  birthDate: Joi.date(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) next(generateError(error.message, httpStatus.BAD_REQUEST));

  next();
};

module.exports = {
  schemaNewUser,
  validateBody,
  schemaUpdateUser
};