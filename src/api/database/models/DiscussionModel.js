import mongoose, { Schema } from 'mongoose';

const DiscussionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  upvote: Number,
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply',
  }],
});

export default mongoose.model('Discussion', DiscussionSchema);
