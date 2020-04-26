import { Router } from 'express';
import { register, login } from '../controllers/users';
import auth from './auth';

const UserRouter = Router();

UserRouter.post('/register', auth.optional, register);
UserRouter.post('/login', auth.optional, login);

export default UserRouter;
