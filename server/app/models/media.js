import mongoose from 'mongoose';
import { filenamify } from '../services/helpers';

function sanitizeDateString(localDate) {
  return localDate.toUTCString();
}

function generateFilename(filename, creationDate) {
  return `${creationDate.getUTCFullYear()}-${creationDate.getUTCMonth() + 1}-${creationDate.getUTCDate()}_${filenamify(filename)}`;
}

const mediaSchema = mongoose.Schema({
  filename: {
    type: String,
    required: true,
    index: { unique: true },
  },
  uploadedAt: {
    type: Date,
    required: true,
  },
  meta: {
    title: {
      type: String,
    },
    altText: {
      type: String,
    },
    caption: {
      type: String,
    },
  },
});

mediaSchema.methods.generateFilename = generateFilename;

mediaSchema.methods.sanitizeDateString = sanitizeDateString;

// mediaSchema.methods.localizeDate = function localizeDate(utcDate) {
//   return new Date(utcDate);
// };


export default mongoose.model('Media', mediaSchema);
