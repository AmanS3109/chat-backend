import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { DI } from '../index'; // or wherever your MikroORM DI is defined
import { User } from '../modules/user/user.entity';

const router = Router();

// Create user
router.post('/', async (req, res) => {
    const { username, email } = req.body;
  
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }
  
    const user = new User(username, email);
    await DI.em.persistAndFlush(user);
    return res.status(201).json(user);
  });
  
  // Get all users
  router.get('/', async (req, res) => {
    const users = await DI.em.find(User, {});
    return res.json(users);
  });
  
  export default router;
