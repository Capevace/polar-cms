import { Strategy } from 'passport-local';
import User from '../app/models/user';

export default (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Signup strategy
  passport.use('signup', new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      process.nextTick(() => {
        User.findOne({ username }, (userFetchErr, user) => {
          if (userFetchErr) {
            return done(userFetchErr);
          }

          if (user) {
            return done(null, false, req.flash('signupMessage', 'That username is already being used.'));
          }

          const newUser = new User();
          newUser.username = username;
          newUser.password = newUser.generateHash(password);

          newUser.save((userSaveError) => {
            if (userSaveError) {
              throw userSaveError;
            }

            return done(null, newUser);
          });

          return null;
        });
      });
    }
  ));


  // Login Strategy
  passport.use('login', new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username }, (fetchErr, user) => {
        if (fetchErr) {
          return done(fetchErr);
        }

        if (!user || (user && !user.isValidPassword(password))) {
          return done(null, false, req.flash('loginMessage', 'Oops! Either that user doesn\'t exist, or you got the wrong password.'));
        }

        return done(null, user);
      });
    }
  ));
};
