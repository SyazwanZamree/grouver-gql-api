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
    parent: [ID]
    children: [ID]
    assignedTo: [ID]
    dueDate: String
    involvedUsers: [ID]
    comments: [ID]
    createdAt: String
    createdBy: ID
  }

  input UpdateTaskInput {
    title: String
    subtitle: String
    parent: [ID]
    children: [ID]
    assignedTo: [ID]
    dueDate: String
    involvedUsers: [ID]
    comments: [ID]
  }

  type Task {
    id: ID!
    title: String
    subtitle: String
    tags: [ID]
    status: ID
    applause: Int
    parent: [ID]
    children: [ID]
    assignedTo: [ID]
    level: ID
    dueDate: String
    involvedUsers: [ID]
    comments: [ID]
    createdAt: String
    createdBy: ID
  }
`;
