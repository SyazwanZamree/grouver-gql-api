import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  body: {
    type: String,
    required: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
});

export default mongoose.model('Tag', TagSchema);
