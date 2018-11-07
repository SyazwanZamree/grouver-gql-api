import mongoose, { Schema } from 'mongoose';

const BadgeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Badge', BadgeSchema);
