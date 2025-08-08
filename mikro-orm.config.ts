import { defineConfig } from '@mikro-orm/postgresql'; // ✅ Explicit driver import
import { User } from './src/modules/user/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  entities: [User],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  migrations: {
    path: './src/migrations',
    pathTs: './src/migrations',
  },
});

