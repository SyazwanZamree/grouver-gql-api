import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  displayName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'Avatar',
  },
  adminList: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  memberList: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  projectList: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('Team', TeamSchema);
