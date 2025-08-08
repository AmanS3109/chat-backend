import { Request, Response } from 'express';
import { redis } from '../lib/redis';
import { Redis } from 'ioredis'; 
import { DI } from '../index';
import { sign } from 'jsonwebtoken';
import { User } from '../modules/user/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import crypto from 'crypto';

declare global {
  namespace Express {
    interface Request {
      orm: { em: EntityManager };
    }
  }
}

const OTP_EXPIRE_SECONDS = 5 * 60;

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await redis.set(`otp:${email}`, otp, 'EX', OTP_EXPIRE_SECONDS);

  console.log(`[DEBUG] OTP for ${email}: ${otp}`);
  // TODO: Replace with nodemailer

  res.json({ message: 'OTP sent to email (check console for now)' });
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
  
    const storedOtp = await redis.get(`otp:${email}`);
  
    if (storedOtp !== otp) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }
  
    let user = await DI.em.findOne(User, { email });
  
    if (!user) {
      user = DI.em.create(User, { email, username: email, createdAt: new Date() });
      await DI.em.persistAndFlush(user);
    }
  
    // OTP is valid – generate a JWT or session (for now, just return success)
    await redis.del(`otp:${email}`); // ✅ clear OTP
  
    res.json({ message: 'OTP verified', userId: user.id });
  };