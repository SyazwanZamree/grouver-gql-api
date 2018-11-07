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
  postsFollowing: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  notifications: [{
    type: Schema.Types.ObjectId,
    ref: 'Notification',
  }],
  experiencePoint: {
    type: Number,
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

  orangeBadges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],

  yellowBadges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],

  greenBadges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],

  blueBadges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],

  indigoBadges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],

  purpleBadges: [{
    type: Schema.Types.ObjectId,
    ref: 'Badge',
  }],

  CRT_TASK_W: { type: Number },
  CRT_DISCUSSION_W: { type: Number },
  CRT_COMMENT_W: { type: Number },
  CRT_REPLY_W: { type: Number },

  CRT_TASK_M: { type: Number },
  CRT_DISCUSSION_M: { type: Number },
  CRT_COMMENT_M: { type: Number },
  CRT_REPLY_M: { type: Number },

  CRT_TASK_A: { type: Number },
  CRT_DISCUSSION_A: { type: Number },
  CRT_COMMENT_A: { type: Number },
  CRT_REPLY_A: { type: Number },

  GFL_DISCUSSION_W: { type: Number },
  GAP_DISCUSSION_W: { type: Number },
  GAP_TASK_W: { type: Number },
  GAP_COMMENT_W: { type: Number },
  GAP_REPLY_W: { type: Number },

  GFL_DISCUSSION_M: { type: Number },
  GAP_DISCUSSION_M: { type: Number },
  GAP_TASK_M: { type: Number },
  GAP_COMMENT_M: { type: Number },
  GAP_REPLY_M: { type: Number },

  GFL_DISCUSSION_A: { type: Number },
  GAP_DISCUSSION_A: { type: Number },
  GAP_TASK_A: { type: Number },
  GAP_COMMENT_A: { type: Number },
  GAP_REPLY_A: { type: Number },

  MIP_TASK_W: { type: Number },
  MDN_TASK_W: { type: Number },
  MSV_DISCUSSION_W: { type: Number },
  MSL_COMMENT_W: { type: Number },
  MHF_COMMENT_W: { type: Number },

  MIP_TASK_M: { type: Number },
  MDN_TASK_M: { type: Number },
  MSV_DISCUSSION_M: { type: Number },
  MSL_COMMENT_M: { type: Number },
  MHF_COMMENT_M: { type: Number },

  MIP_TASK_A: { type: Number },
  MDN_TASK_A: { type: Number },
  MSV_DISCUSSION_A: { type: Number },
  MSL_COMMENT_A: { type: Number },
  MHF_COMMENT_A: { type: Number },
});

export default mongoose.model('User', UserSchema);
