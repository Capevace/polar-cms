import url from 'url';
import loglevel from 'loglevel';
// import loglevelMessagePrefix from 'loglevel-message-prefix';
import config from './config';

// loglevelMessagePrefix(loglevel, {
//   prefixes: ['level', 'timestamp'],
//   prefixFormat: '[%p] ',
//   separator: ' | ',
// });

loglevel.setDefaultLevel(config.logLevel);

export function buildUrl(rootUrl, path) {
  return url.resolve(rootUrl, path);
}

export function buildWebUrl(path) {
  return buildUrl(config.rootUrl, path);
}

export function buildApiUrl(path) {
  return buildUrl(config.apiUrl, path);
}

export function log(...message) {
  loglevel.debug(...message);
}

export function logInfo(...message) {
  loglevel.info(...message);
}

export function logWarning(...message) {
  loglevel.warn(...message);
}

export function logError(...message) {
  loglevel.error(...message);
}

export function logTrace(...message) {
  loglevel.trace(...message);
}

export function parseError(error) {
  if (error.data) {
    switch (error.data.errorCode) {
      case 'VALIDATION':
        return {
          alertType: 'danger',
          message: error.data.message,
        };
      default:
        return {
          alertType: 'danger',
          message: error.data.message,
        };
    }
  }

  return {
    type: 'danger',
    message: `An unknown error occurred. (Code ${error.status})`,
  };
}
