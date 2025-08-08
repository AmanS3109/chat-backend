import express, { Router } from 'express';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.routes';

export const DI = {} as { orm: MikroORM; em: MikroORM['em'] };

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  DI.orm = orm;
  DI.em = orm.em.fork(); // Forked EntityManager for DI

  const app = express();
  app.use(express.json());

  // Wrap every request in a MikroORM RequestContext
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));


  app.use('/api/auth', authRoutes);
  // Routes
  app.use('/api/users', userRoutes);

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
};

main().catch((err) => {
  console.error(err);
});
