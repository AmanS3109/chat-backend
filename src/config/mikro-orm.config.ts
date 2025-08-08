import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from '../modules/user/user.entity';
import { env } from './env';


const config: Options = {
    entities: [User],
    driver: PostgreSqlDriver,
    dbName: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASS,
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    debug: true,
};
  

export default config;

