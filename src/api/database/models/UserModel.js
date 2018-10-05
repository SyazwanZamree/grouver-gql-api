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
  tasksCreated: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  tasksAssigned: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  discussions: [{
    type: Schema.Types.ObjectId,
    ref: 'Discussion',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply',
  }],
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification',
  }],
  // should be renamed to experience point and no ref involved
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
