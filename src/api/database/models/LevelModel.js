import mongoose from 'mongoose';

const LevelSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  level: {
    type: String,
    enum: ['EASY', 'MEDIUM', 'HARD'],
    required: true,
  },
});

export default mongoose.model('Level', LevelSchema);
