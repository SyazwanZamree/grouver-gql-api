import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  invalidToken: {
    type: Boolean,
  },
  teamSession: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  projectSession: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  team: [{
    type: Schema.Types.ObjectId,
    ref: 'Team',
  }],
  avatar: {
    type: Schema.Types.ObjectId,
    ref: 'Avatar',
  },
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
  postsCreated: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  postsAssigned: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  postFollowing: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification',
  }],
  scores: {
    type: Schema.Types.ObjectId,
    ref: 'Score',
  },
  badges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);
