require('dotenv').config();

module.exports = {
  'development': {
    'username': process.env.USER_NAME || 'root',
    'password': process.env.PASSWORD || 'HGTX123',
    'database': process.env.DATABASE || 'HGTX',
    'host': process.env.HOST || 'localhost',
    'dialect': 'mysql'
  }
};
