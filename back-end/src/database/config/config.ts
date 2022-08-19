import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: 'HGTX',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3001,
  dialect: 'mysql',
};

export default config;