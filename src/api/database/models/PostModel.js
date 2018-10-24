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
  // shared between Task and Discussion

  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  title: {
    type: String,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],

  // ----------------------------
  // shared between Task, Discussion and Comment

  status: {
    type: String,
  },

  // ----------------------------
  // specific to Task

  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  difficultyLevel: {
    type: String,
  },
  dueDate: {
    type: Date,
  },

  // ----------------------------
  // specific to Discussion

  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  // ----------------------------
  // specific to Comment

  parentPost: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',
  }],
  replies: [{
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
