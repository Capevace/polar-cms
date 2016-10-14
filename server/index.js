

// require('es6-promise').polyfill();
require('nodejs-dashboard');
require('babel-polyfill');
require('colors');

import express from 'express';
import console from 'better-console';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import path from 'path';
import cors from 'cors';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';

import config from './config';
import routes from './app/routes';

import { viewDataMiddleware } from './app/services/view-data.js';

console.info('Welcome to Polar-CMS!');

mongoose.connect(config.db.url);
mongoose.Promise = global.Promise;

config.passport(passport);

const app = express();

app.use('/static', express.static(path.resolve('server/app/public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');
app.set('views', [config.server.internalViews, config.theme.themeViewFolder]);

// app.use(cors());
app.options('*', cors());
app.use(session({
  secret: 'ilovetits',
  name: 'Polar-CMS Session',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(viewDataMiddleware());
app.disable('x-powered-by');

routes(app, passport);

app.listen(config.server.port);
console.info(`The magic happens on port port ${config.server.port}`);
