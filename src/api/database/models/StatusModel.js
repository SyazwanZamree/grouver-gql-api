import mongoose from 'mongoose';

const StatusSchema = new mongoose.Schema({
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
