'use strict';
/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} dataTypes 
 */
module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    cpf: dataTypes.STRING,
    birthDate: dataTypes.DATEONLY,
    password: dataTypes.STRING,
    phoneNumber: dataTypes.STRING,
    status: dataTypes.STRING,
    createdAt: dataTypes.DATE,
    updatedAt: dataTypes.DATE,
  }, {
    underscored: true
  });

  return User;
};
