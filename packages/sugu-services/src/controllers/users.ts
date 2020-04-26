import * as passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import cloneDeep from 'lodash-es/cloneDeep';

import UserModel, { User } from '../models/user';

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { username } = req.body;

  const user: User = await UserModel.findOne({ email: username }).exec();

  if (!user) {
    return res.status(401).json({
      error: 'Incorrect email or password',
    });
  }

  return passport.authenticate(
    'local',
    (err: Error, authenticatedUser: User) => {
      if (err) {
        return next(err);
      }

      if (user) {
        const generatedUser = cloneDeep(authenticatedUser);
        generatedUser.token = generatedUser.generateJWT();

        return res.json({ ...user.toAuthJSON() });
      }

      return res.status(400).end();
    },
  )(req, res, next);
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, nickName } = req.body;
  const user = new UserModel({ email, password, nickName });
  try {
    await user.save();
    user.token = user.generateJWT();

    res.json({ ...user.toAuthJSON() });
  } catch (error) {
    res.status(500).send({ error });
  }
};

export { login, register };
