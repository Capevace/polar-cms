import express from 'express';
import { apiAuth, sendMongoError, sendError, sendJSON } from '../../services/helpers';
import Post from '../../models/post';
import console from 'better-console';
import postTypes from '../../services/post-types';

const router = express.Router();

function getPostTypeName(postType) {
  if (postTypes[postType]) {
    return postTypes[postType].name;
  }

  return 'Post';
}

router.use(apiAuth);

// GET: All POST-TYPES [array: returns an array instead of a keyed object]
router.get('/post-types', (req, res) => {
  let requestedPostTypes = postTypes;

  if (req.query.array) {
    requestedPostTypes = Object.keys(postTypes).map(key => postTypes[key]);
  }

  sendJSON({
    postTypes: requestedPostTypes,
  }, res);
});

// GET: POST-TYPE with slug
router.get('/post-types/:slug', (req, res) => {
  const type = postTypes[req.params.slug];

  if (type) {
    sendJSON({
      postType: type,
    }, res);
  } else {
    sendError(404, 'The requested post type was not found.', res);
  }
});


// GET: All POSTS with post type
router.get('/:postType', (req, res) => {
  Post.find({ postType: req.params.postType }, (err, posts) => {
    if (err) {
      sendMongoError(err, res);
      return;
    }

    sendJSON({
      posts,
    }, res);
  });
});

// GET: POST with id
router.get('/:postType/:id', (req, res) => {
  Post.findOne({
    postType: req.params.postType,
    _id: req.params.id,
  }, (err, post) => {
    if (err) {
      sendMongoError(err, res);
      return;
    }

    if (post) {
      sendJSON({
        post,
      }, res);
    } else {
      sendError(404, 'The requested post was not found.', res);
    }
  });
});

// POST: Create new POST with post type
router.post('/:postType', (req, res) => {
  const reqPost = req.body.post;

  if (!reqPost) {
    sendError(400, 'No post object was provided in the request.', res);
    return;
  }

  // Make sure the postType is properly set, according to the route
  reqPost.postType = req.params.postType;

  const newPost = new Post(reqPost);
  newPost.save((err, post) => {
    if (err) {
      sendMongoError(err, res);
      return;
    }

    sendJSON({
      message: 'The post was successfully created.',
      id: post._id, // eslint-disable-line
    }, res);
  });
});

// PUT: Update POST with post type and id
router.put('/:postType/:id', (req, res) => {
  const reqPost = req.body.post;

  if (!reqPost) {
    sendError(400, 'No post object provided in request.', res);
    return;
  }

  // Find post with slug,
  //  -> if it already exists we return an error message
  //  -> otherwise we continue with updating it
  Post.findOne(
    {
      slug: reqPost.slug,
      _id: { $ne: reqPost._id }, // eslint-disable-line no-underscore-dangle
    },
    (existsFindError, post) => {
      if (post || existsFindError) {
        sendError(409, 'A Post with that slug already exists.', res);
      } else {
        Post.findOneAndUpdate(
          { _id: req.params.id },
          reqPost,
          { runValidators: true }, // Run validators to make sure the input is validated
          (updateError, updatedPost) => {
            if (updateError) {
              sendMongoError(updateError, res);
            } else {
              sendJSON({
                message: `The ${getPostTypeName(updatedPost.postType)} was updated successfully`,
              }, res);
            }
          }
        );
      }
    });
});

// DELETE: POST with post type and id
router.delete('/:postType/:id', (req, res) => {
  Post.findOne({ postType: req.params.postType, _id: req.params.id })
    .remove((err, result) => {
      if (err) {
        sendMongoError(err, res);
        return;
      }

      if (result.result.n > 0) { // n > 0 => number of removed posts > 0
        sendJSON({
          message: `The ${getPostTypeName(req.params.postType)} was removed.`,
        }, res);
      } else {
        sendError(404, `The requested ${getPostTypeName(req.params.postType)} was not found.`, res);
      }
    });
});

export default router;
