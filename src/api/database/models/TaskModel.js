import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
  },
  parent: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  children: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
  assignedTo: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  status: {
    type: Schema.Types.ObjectId,
    ref: 'Status',
  },
  dueDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  involvedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Task', TaskSchema);
