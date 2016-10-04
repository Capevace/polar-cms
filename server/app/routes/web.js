import { combineViewData } from '../services/view-data.js';
import { loginRequired } from '../services/helpers';
import User from '../models/user';
import Post from '../models/post';

export default (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    }

    return next();
  }, (req, res) => {
    res.render(
      'login',
      combineViewData(req, {
        message: req.flash('loginMessage'),
      })
    );
  });

  app.post('/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  }));

  app.get('/signup', (req, res) => {
    res.render(
      'signup',
      combineViewData(req, {
        message: req.flash('signupMessage'),
      })
    );
  });

  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash: true,
  }));

  app.get('/dashboard', loginRequired, (req, res) => {
    res.render('dashboard', combineViewData(req));
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
