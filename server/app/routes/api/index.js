import express from 'express';
import User from '../../models/user';

import postRoutes from './post-routes';

const router = express.Router();

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err)
      res.send('Error: ' + err.toString());


    res.json(users);
  });
});

router.use('/posts', postRoutes);

export default router;
