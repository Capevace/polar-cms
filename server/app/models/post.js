import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    index: { unique: true },
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    default: [],
  },
  info: {
    type: Object,
    default: {},
  },
  meta: {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    published_on: {
      type: Date,
    },
  },
  settings: {
    grouped: {
      type: Boolean,
      default: true,
    },
  },
});

export default mongoose.model('Post', postSchema);
