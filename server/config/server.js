import path from 'path';

export default {
  port: 8080,
  internalViews: path.resolve('server-build/app/views'),
  publicPostGetRoutes: true,
  rootUrl: 'http://polar.dev:8080/',
};
