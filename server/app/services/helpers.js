import config from '../../config';
import console from 'better-console';

const skipAPIAuth = true;

function isLoggedIn(req) {
  return !!req.isAuthenticated();
}

export function loginRequired(req, res, next) {
  if (isLoggedIn(req)) {
    return next();
  }

  res.redirect('/');
  return null;
}

export function apiAuth(req, res, next) {
  if (skipAPIAuth) {
    return next();
  }

  if (isLoggedIn(req)) {
    return next();
  }

  res.status(401);
  res.json({
    status: 401,
    message: 'Unauthorized',
  });
  res.end();
  return null;
}

export function checkPublicGetRoutes(req, res, next) {
  if (config.server.publicPostGetRoutes) {
    return next();
  }

  if (isLoggedIn(req)) {
    return next();
  }

  res.status(401);
  res.json({
    status: 401,
    message: 'Unauthorized',
  });
  res.end();
  return null;
}

export function handleMongoError(error, res) {
  if (error.name === 'ValidationError') {
    res.status(400);
    res.json({
      status: 400,
      message: 'Validation Error.',
      errors: error.errors,
    });
    res.end();
  } else if (error.code === 11000) { // 11000 => Unique slug already exists
    res.status(400);
    res.json({
      status: 400,
      message: 'Post with that slug already exists.',
    });
    res.end();
  } else {
    res.status(500);
    res.json({
      status: 500,
      message: 'Unknown error creating post.',
    });
    res.end();

    console.error(error);
  }
}
