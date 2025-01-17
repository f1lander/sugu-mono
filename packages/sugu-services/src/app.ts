import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import { connect, set } from 'mongoose';
import { join } from 'path';
import errorHandler from 'errorhandler';
import router from './router/index';

require('dotenv').config();

const app = express();

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';
// config passport
require('./config/passport');

app.use(cors());
// eslint-disable-next-line @typescript-eslint/no-var-requires
app.use(require('morgan')('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

if (!isProduction) app.use(errorHandler());

// Connect to MongoDB
connect(process.env.MONGODB_URI_LOCAL);
set('debug', true);

app.use('/api', router);

// app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

export default app;
