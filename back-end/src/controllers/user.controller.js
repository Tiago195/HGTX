const service = require('../services/user.service');
const httpStatus = require('http-status-codes').default;

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const users = await service.getAll();

      res.status(httpStatus.OK).json(users);
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      // console.log(id);
      const user = await service.getById(id);

      res.status(httpStatus.OK).json(user);
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await service.getByEmailAndPassword({ email, password });

      res.status(httpStatus.OK).json({ token });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, email, cpf, password, birthDate, phoneNumber } = req.body;

      const token = await service.create({ name, email, cpf, password, birthDate, phoneNumber });

      res.status(httpStatus.CREATED).json({ token });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.destroy(id);

      res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, email, password, birthDate, phoneNumber, status } = req.body;

      const user = await service
        .update({ name, email, password, birthDate, phoneNumber, status }, id);

      res.status(httpStatus.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
};