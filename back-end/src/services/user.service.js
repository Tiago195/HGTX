const { user } = require('../database/models');
const generateError = require('../utils/generateError');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const httpStatus = require('http-status-codes').default;

module.exports = {
  getAll: async () => {
    return user.findAll({ where: { isAdmin: 0 }, attributes: { exclude: ['password'] } });
  },
  getById: async (id) => {
    const existsUser = await user.findByPk(id);
    if (!existsUser) throw generateError('User not found', httpStatus.NOT_FOUND);
    delete existsUser.dataValues.password;
    // console.log('user', existsUser);
    return existsUser;
  },
  getByEmailAndPassword: async ({ email, password }) => {
    const existsUser = await user.findOne({ where: { email, isAdmin: 1 } });
    // console.log(existsUser);
    if (!existsUser) throw generateError('Only admins are allowed', httpStatus.FORBIDDEN);

    const isPassword = await bcrypt.compare(password, existsUser.password);
    // console.log(isPassword);

    if (!isPassword) throw generateError('Email or Password incorrect', httpStatus.UNAUTHORIZED);

    const token = jwt.encode(existsUser.dataValues);

    return token;
  },
  create: async (obj) => {
    const existsUser = await user.findOne({ where: { email: obj.email } });

    if (existsUser) throw generateError('User already exists', httpStatus.CONFLICT);

    const salt = await bcrypt.genSalt(5);
    const password = await bcrypt.hash(obj.password, salt);
    const newUser = await user.create({ ...obj, password });

    const token = jwt.encode(newUser.dataValues);

    return token;
  },
  update: async (obj, id) => {
    await user.update({ ...obj, updatedAt: new Date() }, { where: { id } });

    return obj;
  },
  destroy: async (id) => user.update({ status: 'Desativado', updatedAt: new Date() }, { where: { id } })
};