import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema({
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

export default mongoose.model('Notification', NotificationSchema);
