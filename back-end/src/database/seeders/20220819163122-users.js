'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Santos',
        email: 'Santos@email.com',
        cpf: '12332161661',
        password: 'SantosOMaisBonito',
        status: 'Ativo',
        createdAt: new Date('11/08/2021'),
        updatedAt: new Date('11/08/2021'),
      },
      {
        name: 'Yang wom',
        email: 'Yang@wom.com',
        cpf: '00011122257',
        password: 'YangOBrabo',
        status: 'Ativo',
        birth_date: new Date('07/06/1999'),
        createdAt: new Date('4/28/2021'),
        updatedAt: new Date('4/28/2021'),
      },
      {
        name: 'Carlao',
        email: 'Carlao123@email.com',
        cpf: '33344455577',
        password: 'CarlaoDasMaquinas',
        status: 'Ativo',
        birth_date: new Date('01/01/2001'),
        phone_number: '11991111111',
        createdAt: new Date('12/07/2022'),
        updatedAt: new Date('12/07/2022'),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
