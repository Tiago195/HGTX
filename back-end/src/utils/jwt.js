const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'senha super secreta';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  encode: (data) => {
    const { birthDate, phoneNumber, createdAt, updatedAt,
      password, cpf, ...dataUser } = data;

    return JWT.sign({ data: dataUser }, secret, jwtConfig);
  },
  decode: (token) => JWT.decode(token),
};
