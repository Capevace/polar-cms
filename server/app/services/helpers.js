import config from '../../config';
import console from 'better-console';
import url from 'url';
import _filenamify from 'filenamify';

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

export function sendError(status, message, res) {
  res.status(status);
  res.json({
    status,
    message,
  });
  res.end();
}

export function sendJSON(content = {}, res) {
  res.status(200);
  res.json(Object.assign({
    status: 200,
  }, content));
  res.end();
}

export function sendMongoError(error, res, itemSettings = {
  name: 'Item',
}) {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors)
      .map((validationError, index) =>
        `${index + 1}. ${validationError.message}`
      );

    sendError(400, errors.join('<br>'), res);
    return;
  } else if (error.code === 11000) { // 11000 => Unique slug already exists
    console.error(
      'Proper Error handling for duplicated unique keys is not implemented in here:',
      JSON.stringify(error, null, 2)
    );

    sendError(400, `That ${itemSettings.name} already exists.`, res);
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

export function filenamify(filename) {
  return _filenamify(filename)
    .replace(new RegExp(' ', 'g'), '-');
}

export function buildUrl(path) {
  return url.resolve(config.server.rootUrl, path);
}
