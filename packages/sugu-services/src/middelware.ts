import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

const secret = process.env.SECRET_KEY;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const WithAuth = (
  req: Request & { email: string },
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, (err: Error, decoded: { email: string }) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

export default WithAuth;
