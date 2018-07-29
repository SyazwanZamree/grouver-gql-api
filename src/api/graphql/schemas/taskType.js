export default `
  type Query {
    getTasks: [Task]
  }

  type Mutation {
    addTask(input: TaskInput): Task
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
