import mongoose, { Schema } from 'mongoose';

const TagSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  level: {
    type: String,
    enum: ['TEST', 'JOG', 'RUNNING'],
    required: true,
  },
});

export default mongoose.model('Tag', TagSchema);
