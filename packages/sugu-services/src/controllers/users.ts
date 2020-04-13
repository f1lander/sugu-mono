import * as passport from 'passport';
import { default as User, IUser } from '../models/User';

import { Request, Response, NextFunction } from 'express';

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user: IUser = await User.findOne({ email: username }).exec();

  if (!user) {
    return res.status(401).json({
      error: 'Incorrect email or password',
    });
  }

  return passport.authenticate(
    'local',
    (err: any, user: IUser & any, info: any) => {
      if (err) {
        return next(err);
      }

      if (user) {
        user.token = user.generateJWT();

        return res.json({ ...user.toAuthJSON() });
      }

      return res.status(400).end();
    },
  )(req, res, next);
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, nickName } = req.body;
  const user = new User({ email, password, nickName });
  try {
    await user.save();
    user.token = user.generateJWT();

    return res.json({ ...user.toAuthJSON() });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export { login, register };
