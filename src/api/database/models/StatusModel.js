import mongoose, { Schema } from 'mongoose';

const StatusSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  level: {
    type: String,
    enum: ['TODO', 'INPPROGRESS', 'DONE'],
    required: true,
  },
});

export default mongoose.model('Status', StatusSchema);
