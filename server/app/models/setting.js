import mongoose from 'mongoose';

const settingSchema = mongoose.Schema({
  pageTitle: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Setting', settingSchema);
