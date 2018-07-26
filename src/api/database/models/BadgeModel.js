import mongoose, { Schema } from 'mongoose';

const BadgeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model('Badge', BadgeSchema);
