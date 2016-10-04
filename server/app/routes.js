import webRoutes from './routes/web';
import apiRouter from './routes/api';

export default (app, passport) => {
  app.use('/api', apiRouter);

  webRoutes(app, passport);
};
