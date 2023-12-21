import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { ACCESS_TOKEN_SECRET } from '../lib/config/env';
import User from '../models/users';

declare global {
  namespace Express {
    interface Request {
      user?: InstanceType<typeof User> | undefined;
    }
  }
}

export const Protection = async (
  request: Request,
  response: Response,
  next: () => void
) => {
  try {
    let token;
    console.log('request: ', request.cookies);
    if (request.cookies && request.cookies['next-auth.session-token']) {
      try {
        token = request.cookies['next-auth.session-token'];
        console.log('token: ', token);
        const verifyToken = jwt.verify(token, String(ACCESS_TOKEN_SECRET));
        console.log('verifyToken', verifyToken);
        if (verifyToken && typeof verifyToken !== 'string') {
          const foundUser = await User.findOne({
            email: verifyToken?.email,
          }).select('-password');
          console.log('User', foundUser);
          if (foundUser) request.user = foundUser;
          else
            return response
              .status(404)
              .json({ error: 'Token was verified but user was not found.' });
        }
        next();
      } catch (error) {
        response.status(401).json({ msg: 'Not Authorized' });
      }
    }
    if (!token) {
      response.status(401);
      throw new Error('Not Authorized, And Token Not Found');
    }
  } catch (error) {
    response.status(401).json({ msg: 'Not Authorized, And Token Not Found' });
  }
};
