const dotenv = require('dotenv');
dotenv.config();
const {
  DB_TYPE,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
} = process.env;

module.exports = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  extra: {
    // based on  https://node-postgres.com/api/pool
    // max connection pool size
    max: 1000,
    // connection timeout
    connectionTimeoutMillis: 20000,
    connectionLimit: 1000,
  },
  // synchronize: true,
};
