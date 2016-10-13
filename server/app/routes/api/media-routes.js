import express from 'express';
import { apiAuth, sendMongoError, buildUrl } from '../../services/helpers';
import Media from '../../models/media';
import path from 'path';

function addMediaSrc(mediaItem) {
  const newMediaItem = mediaItem.toObject();
  newMediaItem.src = buildUrl(`api/media/${mediaItem.filename}`);

  return newMediaItem;
}

const router = express.Router(); // eslint-disable-line new-cap

router.use(apiAuth);

router.get('/all', (req, res) => {
  Media.find({}, (err, all) => {
    if (err) {
      sendMongoError(err, res);
    } else {
      res.status(200);
      res.json({
        status: 200,
        items: all.map(mediaItem => addMediaSrc(mediaItem)),
      });
    }
  });
});

router.get('/:filename', (req, res) => {
  Media.findOne({ filename: req.params.filename }, (err, media) => {
    if (err || !media) {
      res.status(404);
      res.json({
        status: 404,
        message: 'Media not found.',
      });
      res.end();
      return;
    }

    res.sendFile(path.join(__dirname, '../../../../storage', req.params.filename.replace(/(.\/|..\/)/g, '')));
  });
});

router.get('/:filename/meta', (req, res) => {
  Media.findOne({ filename: req.params.filename }, (err, media) => {
    if (err) {
      res.status(404);
      res.json({
        status: 404,
        message: 'Media not found.',
      });
      res.end();
      return;
    }

    res.status(200);
    res.json({
      status: 200,
      item: media,
    });
  });
});

export default router;
