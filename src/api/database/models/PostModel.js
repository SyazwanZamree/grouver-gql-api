import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  // interface Post
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postType: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  applause: {
    type: Number,
  },
  applaudedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  // ----------------------------
  // shared between Task, Discussion, Comment and Reply

  title: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],

  // ----------------------------
  // shared between Task, Discussion and Comment

  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
  },

  // ----------------------------
  // shared between Task and Discussion

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],

  // ----------------------------
  // specific to Task

  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  level: [{
    type: Number,
  }],
  dueDate: {
    type: Date,
  },

  // ----------------------------
  // specific to Discussion

  follower: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  // ----------------------------
  // specific to Comment

  parentPost: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  reply: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],

  // ----------------------------
  // specific to Reply

  parentComment: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],

  // ----------------------------
});

export default mongoose.model('Post', PostSchema);
