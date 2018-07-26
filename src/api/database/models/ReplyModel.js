import mongoose, { Schema } from 'mongoose';

const ReplySchema = new Schema({
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
});

export default mongoose.model('Reply', ReplySchema);
