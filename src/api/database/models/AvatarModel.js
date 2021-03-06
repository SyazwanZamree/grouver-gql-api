import mongoose, { Schema } from 'mongoose';

const AvatarSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  smallUrl: {
    type: String,
    unique: true,
  },
  mediuUrl: {
    type: String,
    unique: true,
  },
  largeUrl: {
    type: String,
    unique: true,
  },
});

export default mongoose.model('Avatar', AvatarSchema);
