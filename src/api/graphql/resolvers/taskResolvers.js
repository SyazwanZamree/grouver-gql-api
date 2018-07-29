class Task {
  constructor({
    title,
    subtitle,
    tags,
    status,
    parent,
    children,
    assignedTo,
    level,
    dueDate,
    involvedUsers,
    comments,
    createdAt,
    createdBy,
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.tags = tags;
    this.status = status;
    this.parent = parent;
    this.children = children;
    this.assignedTo = assignedTo;
    this.level = level;
    this.dueDate = dueDate;
    this.involvedUsers = involvedUsers;
    this.comments = comments;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

const taskResolvers = {
  Query: {
    getTasks: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addTask: (parent, { input }) => {
      const newTask = new Task(input);
      return newTask;
    },
  },
};

export default taskResolvers;
