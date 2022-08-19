// Exemple

// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import User from '../database/models/user'
// import { User as userModel } from './mock/models'

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Testes rota login', () => {
//   describe('POST login caso de sucesso', () => {
//     let users: Response;

//     before(async () => {
//       sinon.stub(User, 'findOne').callsFake(userModel.findOne);
//       users = await chai.request(app).post('/login').send({
//         email: 'admin@admin.com',
//         password: 'secret_admin'
//       })
//     })

//     after(() => {
//       (User.findOne as sinon.SinonStub).restore()
//     })
//     it('verifica se o status da requisição é 200', async () => {
//       // console.log(users)
//       expect(users).to.have.status(200);
//     })

//     it('verifica se o body da requisição tem chave token', async () => {
//       expect(users.body).to.have.property('token')
//     })
//   })
// });
