import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
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

export default mongoose.model('Notification', Notification);
