const JWT = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'senha super secreta';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  encode: (data) => {
    // const { birthDate, phoneNumber, createdAt, updatedAt,
    //   password, cpf, ...dataUser } = data;
    const { name, email, id, status } = data;
    return JWT.sign({ name, email, id, status }, secret, jwtConfig);
  },
  decode: (token) => JWT.decode(token),
};
