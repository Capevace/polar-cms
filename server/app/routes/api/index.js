import express from 'express';
import User from '../../models/user';

import postRoutes from './post-routes';
import mediaRoutes from './media-routes';

const router = express.Router();

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      res.send(`Error: ${err.toString()}`);


    res.json(users);
  });
});

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.use('/posts', postRoutes);
router.use('/media', mediaRoutes);

export default router;
