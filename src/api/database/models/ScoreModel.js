import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  gold: {
    type: Number,
  },
  silver: {
    type: Number,
  },
  bronze: {
    type: Number,
  },
});

export default mongoose.model('Score', ScoreSchema);
