const users = require('./users.mock');

const mockFindAll = (instance) => {
  return instance
}

const mockFindByPk = (instance, id) => {
  const instanceWithId = instance.map((el, i) => ({ ...el, id: i + 1 }))
  const user = instanceWithId.find(el => el.id === +id);
  return user ? { dataValues: user } : undefined;
}

const mockFindOne = (instance, { where }) => {
  let user;
  if (where.isAdmin) {
    const te = instance.findIndex(el => el.email === where.email);
    if (instance[te].isAdmin) { user = instance[te] }
    return user ? { dataValues: user, ...user } : undefined;
  }
  return instance.find(el => el.email === where.email);
}

const mockCreate = (isntance, obj) => {
  isntance.push(obj);
  return { dataValues: obj };
}

const mockUpdate = (instance, obj, { where }) => {
  const targetUser = instance.findIndex((el, i) => i + 1 === +where.id);

  const entries = Object.entries(obj).filter(el => el[1]);
  const newObj = Object.fromEntries(entries);

  instance[targetUser] = { ...instance[targetUser], ...newObj }

}

const mockDelete = (instance, { where }) => {
  instance = instance.filter(el => el.id !== +where.id)
}

const userMock = {
  findAll: async () => mockFindAll(users),
  findByPk: async (id) => mockFindByPk(users, id),
  findOne: async (where) => mockFindOne(users, where),
  create: async (user) => mockCreate(users, user),
  update: async (user, where) => mockUpdate(users, user, where),
  destroy: async (where) => mockDelete(users, where),
}

module.exports = {
  userMock
}