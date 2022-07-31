import { DataSourceOptions } from 'typeorm';

import 'dotenv/config';

export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  entities: ['dist/**/entities/*entity.js'],
  migrations: ['dist/**/migration/*.js'],
  migrationRun: true,
} as DataSourceOptions;
