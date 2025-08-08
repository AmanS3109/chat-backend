import { Request, Response } from 'express';
import { DI } from '../index'; // we'll define DI in a moment
import { User } from '../modules/user/user.entity';

export const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  try {
    const user = new User(username, email);
    await DI.em.persistAndFlush(user);

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
