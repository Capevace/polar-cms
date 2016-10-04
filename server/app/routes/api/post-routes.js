import express from 'express';
import { apiAuth, handleMongoError } from '../../services/helpers';
import Post from '../../models/post';
import console from 'better-console';
import postTypes from '../../services/post-types';

const router = express.Router();

router.use(apiAuth);

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

router.get('/post-types', (req, res) => {
  if (req.query.array) {
    res.json(Object.keys(postTypes).map(key => postTypes[key]));
  } else {
    res.json(postTypes);
  }
});

router.get('/post-types/:slug', (req, res) => {
  const type = postTypes[req.params.slug];

  if (type) {
    res.json(type);
  } else {
    res.status(404);
    res.json({
      status: 404,
      message: 'Type not found.',
    });
    res.end();
  }
});

router.get('/:postType', (req, res) => {
  Post.find({ postType: req.params.postType }, (err, posts) => {
    if (err) {
      handleMongoError(err, res);
      return;
    }

    res.json(posts);
  });
});

router.get('/:postType/:slug', (req, res) => {
  Post.findOne({
    postType: req.params.postType,
    slug: req.params.slug,
  }, (err, post) => {
    if (err) {
      handleMongoError(err, res);
      return;
    }

    if (post) {
      res.json(post);
      res.end();
    } else {
      res.status(404);
      res.json({
        status: 404,
        message: 'Post not found',
      });
      res.end();
    }
  });
});

router.post('/:postType', (req, res) => {
  const reqPost = req.body.post;

  if (!reqPost) {
    res.status(400);
    res.json({
      status: 400,
      message: 'No post object provided in request.',
    });
    res.end();
    return;
  }

  reqPost.postType = req.params.postType;

  const newPost = new Post(reqPost);

  newPost.save((err, post) => {
    if (err) {
      handleMongoError(err, res);
      return;
    }

    res.status(200);
    res.json({
      status: 200,
      message: 'The post was successfully created.',
      id: post._id,
    });
  });
});

router.put('/:postType/:slug', (req, res) => {
  const reqPost = req.body.post;

  if (!reqPost) {
    res.status(400);
    res.json({
      status: 400,
      message: 'No post object provided in request.',
    });
    res.end();
    return;
  }

  Post.findOneAndUpdate({
    postType: req.params.postType,
    slug: req.params.slug,
  }, {
    $set: req.body.post,
  },
    {},
    (err, post) => {
      if (err) {
        handleMongoError(err, res);
        return;
      }

      res.send(post);
    });
});

router.delete('/:postType/:slug', (req, res) => {
  Post
      .findOne({
        postType: req.params.postType,
        slug: req.params.slug,
      })
      .remove((err, result) => {
        if (err) {
          res.status(500);
          res.json({
            status: 500,
            message: 'Unknown error removing post. See logs for full error.',
          });
          res.end();
          console.error(err);
          return;
        }

        if (result.result.n > 0) { // n > 0 => number of removed posts > 0
          res.status(200);
          res.json({
            status: 200,
            message: 'Post was successfully removed.',
          });
          res.end();
        } else {
          res.status(404);
          res.json({
            status: 404,
            message: 'Post was not found.',
          });
          res.end();
        }
      });
});

export default router;
