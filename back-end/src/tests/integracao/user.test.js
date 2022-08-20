const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../index');
const { user } = require('../../database/models');
const { userMock } = require('./mock');
const jwt = require('../../utils/jwt');

// const token = jwt.encode(userMock.findAll()[0]);

chai.use(chaiHttp);

const { expect } = chai;

describe('Test route users', () => {
  describe('GET verb, route /users', () => {
    let users;
    let token;
    before(async () => {
      sinon.stub(user, 'findAll').callsFake(userMock.findAll);
      userMock.findByPk().then(res => { token = jwt.encode({ ...res, id: 4 }) });
    })

    after(() => {
      user.findAll.restore();
    })

    it('case of secession', async () => {
      users = await chai.request(app).get('/users').set({ Authorization: token });
      expect(users).to.have.status(200);
      expect(users.body).not.have.property('password');
    })

    it('failure case because token not found', async () => {
      users = await chai.request(app).get('/users');
      expect(users).to.have.status(404);
      expect(users.body).to.have.property('message');
      // console.log(users)
    })

    it('failure case because token must be a valid', async () => {
      users = await chai.request(app).get('/users').set({ Authorization: 'invalid' });
      expect(users).to.have.status(401);
      expect(users.body).to.have.property('message');
    })
  })
  describe('GET verb, route /users/:id', () => {
    let users;
    let token;
    before(async () => {
      sinon.stub(user, 'findByPk').callsFake(userMock.findByPk);
      userMock.findByPk().then(res => { token = jwt.encode({ ...res, id: 4 }) });
    })

    after(() => {
      user.findByPk.restore();
    })
    it('case of sucess', async () => {
      users = await chai.request(app).get('/users/1').set({ Authorization: token });

      expect(users).to.have.status(200);
    })
    it('failure case because user not found', async () => {
      users = await chai.request(app).get('/users/99999').set({ Authorization: token });
      expect(users).to.have.status(404);
    })
    it('failure case because token not found', async () => {
      users = await chai.request(app).get('/users/1');
      expect(users).to.have.status(404);
      expect(users.body).to.have.property('message');
      // console.log(users)
    })
    it('failure case because token must be a valid', async () => {
      users = await chai.request(app).get('/users/1').set({ Authorization: 'invalid' });
      expect(users).to.have.status(401);
      expect(users.body).to.have.property('message');
    })
  })
  describe('POST verb, route /users/signin', () => {
    let users;
    before(async () => {
      sinon.stub(user, 'findOne').callsFake(userMock.findOne);
    })

    after(() => {
      user.findOne.restore();
    })

    it('case of sucess', async () => {
      users = await chai.request(app).post('/users/signin').send({
        email: 'Admin@Admin.com',
        password: 'admin'
      })
      expect(users).to.have.status(200);
    })
    it('failure case because user is not admin', async () => {
      users = await chai.request(app).post('/users/signin').send({
        email: 'Carlao123@email.com',
        password: 'CarlaoDasMaquinas'
      })

      expect(users).to.have.status(403);
    })
    it('failure case because email or password incorrect', async () => {
      users = await chai.request(app).post('/users/signin').send({
        email: 'Admin@Admin.com',
        password: 'senha errada'
      })
      expect(users).to.have.status(401);
    })
  })
  describe('POST verb, route /users/signup', () => {
    let users;
    before(async () => {
      sinon.stub(user, 'create').callsFake(userMock.create)
      sinon.stub(user, 'findOne').callsFake(userMock.findOne);
    })

    after(() => {
      user.create.restore();
      user.findOne.restore();
    })

    it('case of sucess', async () => {
      const newUser = {
        name: "banguela",
        email: "banguela@yahoo.com",
        cpf: "05995044044",
        password: "minhaSuperSecreta"
      }
      users = await chai.request(app).post('/users/signup').send(newUser);

      expect(users).to.have.status(201);
    })
    it('failure case because cpf invalid', async () => {
      const newUser = {
        name: "banguela",
        email: "banguela@yahoo.com",
        cpf: "00000000000",
        password: "minhaSuperSecreta"
      }
      users = await chai.request(app).post('/users/signup').send(newUser);

      expect(users).to.have.status(400);
    })
    it('failure case because body invalid', async () => {
      const newUser = {
        name: "banguela",
        email: "banguela@yahoo.com",
        cpf: "05995044044",
      }
      users = await chai.request(app).post('/users/signup').send(newUser);

      expect(users).to.have.status(400);
    })
    it('failure case becauseuser already exists', async () => {
      const newUser = {
        name: "Carlao",
        email: "Carlao123@email.com",
        cpf: "05995044044",
        password: 'CarlaoDasMaquinas'
      }
      users = await chai.request(app).post('/users/signup').send(newUser);

      expect(users).to.have.status(409);
    })
  })
  describe('PUT verb, route /users/:id', () => {
    let users;
    let token;
    before(async () => {
      sinon.stub(user, 'update').callsFake(userMock.update);
      sinon.stub(user, 'findByPk').callsFake(userMock.findByPk);
      userMock.findByPk().then(res => { token = jwt.encode({ ...res, id: 4 }) });
    })

    after(() => {
      user.update.restore()
    })

    it('cafe os sucess', async () => {
      const updateUser = {
        name: 'Santos Santoro'
      }

      users = await chai.request(app).put('/users/1').send(updateUser).set({ Authorization: token });
      const userOneChanged = await chai.request(app).get('/users/1').set({ Authorization: token });

      expect(users).to.have.status(200);
      expect(userOneChanged.body.dataValues.name).to.be.equal('Santos Santoro');
    })
    it('failure case because token not found', async () => {
      users = await chai.request(app).put('/users/1');
      expect(users).to.have.status(404);
      expect(users.body).to.have.property('message');
      // console.log(users)
    })
    it('failure case because token must be a valid', async () => {
      users = await chai.request(app).put('/users/1').set({ Authorization: 'invalid' });
      expect(users).to.have.status(401);
      expect(users.body).to.have.property('message');
    })
    it('failure case because body invalid', async () => {
      const updateUser = {
        name: "s"
      }
      users = await chai.request(app).put('/users/1').send(updateUser).set({ Authorization: token });
      expect(users).to.have.status(400);
    })
  })
  describe('DELETE verb, route /users/:id', () => {
    let users;
    let token;
    before(() => {
      sinon.stub(user, 'destroy').callsFake(userMock.destroy);
      userMock.findByPk().then(res => { token = jwt.encode({ ...res, id: 4 }) });
    })

    after(() => {
      user.destroy.restore()
    })

    it('case of sucess', async () => {
      users = await chai.request(app).delete('/users/1').set({ Authorization: token });

      expect(users).to.have.status(204);
    })
    it('failure case because token not found', async () => {
      users = await chai.request(app).delete('/users/1');
      expect(users).to.have.status(404);
      expect(users.body).to.have.property('message');
      // console.log(users)
    })

    it('failure case because token must be a valid', async () => {
      users = await chai.request(app).delete('/users/1').set({ Authorization: 'invalid' });
      expect(users).to.have.status(401);
      expect(users.body).to.have.property('message');
    })
  })
});
