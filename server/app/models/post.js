import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The Post\'s Title is required.'],
  },
  slug: {
    type: String,
    index: { unique: true },
    required: [true, 'The Post\'s Slug is required.'],
  },
  postType: {
    type: String,
    required: [true, 'A Post needs to be grouped in a Post Type.'],
  },
  content: {
    type: Array,
    default: [],
  },
  excerpt: {
    type: String,
  },
  thumbnail: {
    type: mongoose.Schema.ObjectId,
    // ref: 'Media',
  },
  customContent: {
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
    tags: {
      type: Array,
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
