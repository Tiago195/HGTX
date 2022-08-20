'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Santos',
        email: 'Santos@email.com',
        cpf: '12332161661',
        password: '$2b$05$YCCG2onvHDOyfVBCr/aiv.1G6SIXQbS7nOsa/zdzBfL1enp2mBw02',
        is_admin: 0,
        // password - SantosOMaisBonito
        status: 'Ativo',
        created_at: new Date('11/08/2021'),
        updated_at: new Date('11/08/2021'),
      },
      {
        name: 'Yang wom',
        email: 'Yang@wom.com',
        cpf: '00011122257',
        password: '$2b$05$cwF.cmYQMgBtCWpxnDGAluQ5tKsanpkNZzGXjE8UjQVdDdeM.rql.',
        is_admin: 0,
        // password - YangOBrabo
        status: 'Ativo',
        birth_date: new Date('07/06/1999'),
        created_at: new Date('4/28/2021'),
        updated_at: new Date('4/28/2021'),
      },
      {
        name: 'Carlao',
        email: 'Carlao123@email.com',
        cpf: '33344455577',
        password: '$2b$05$Y16T3rYxcdOhcbRxNyao8ufIU3XbnMCsiAfN39hA5eEItHqsLtkbu',
        is_admin: 0,
        // password - CarlaoDasMaquinas
        status: 'Ativo',
        birth_date: new Date('01/01/2001'),
        phone_number: '11991111111',
        created_at: new Date('12/07/2022'),
        updated_at: new Date('12/07/2022'),
      },
      {
        name: 'Admin',
        email: 'Admin@Admin.com',
        cpf: '00000000000',
        password: '$2b$05$4EV7CttcM2odO0otJiSdt.z5wGfxMNxm7cWdqicDkRyYOysecbe7S',
        // password - admin
        is_admin: 1,
        status: 'Ativo',
        created_at: new Date('12/07/2022'),
        updated_at: new Date('12/07/2022'),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
