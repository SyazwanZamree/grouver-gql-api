export default `
  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput): Task
    updateTask(id: ID!, input: UpdateTaskInput): Task
    deleteTask(id: ID!): Task
  }

  input TaskInput {
    title: String
    subtitle: String
    parent: [TaskInput]
    children: [TaskInput]
    assignedTo: [UserInput]
    dueDate: String
    involvedUsers: [UserInput]
    comments: [CommentInput]
    createdAt: String
    createdBy: UserInput
  }

  input UpdateTaskInput {
    title: String
    subtitle: String
    parent: [TaskInput]
    children: [TaskInput]
    assignedTo: [UserInput]
    dueDate: String
    involvedUsers: [UserInput]
    comments: [CommentInput]
  }

  type Task {
    id: ID!
    title: String
    subtitle: String
    tags: [Tag]
    status: Status
    parent: [Task]
    children: [Task]
    assignedTo: [User]
    level: Level
    dueDate: String
    involvedUsers: [User]
    comments: [Comment]
    createdAt: String
    createdBy: User
  }
`;
