export default `
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(
      id: ID!,
      input: UpdateUserInput,
      projects: [UserProjectInput]
      tasksCreated: [UserTaskInput]
      tasksAssigned: [UserTaskInput]
      discussionsCreated: [UserDiscussionInput]
      commentsCreated: [UserCommentInput]
      repliesCreated: [UserReplyInput]
      ): User
    deleteUser(id: ID!): User
  }

  input UserInput {
    displayName: String!
    name: String!
    email: String!
    password: String!
    createdAt: String
  }

  input UpdateUserInput {
    displayName: String
    name: String
    email: String
    password: String
    avatar: ID
    team: ID
    score: ID
  }

  input UserProjectInput {
    id: ID
  }

  input UserTaskInput {
    id: ID
  }

  input UserDiscussionInput {
    id: ID
  }

  input UserCommentInput {
    id: ID
  }

  input UserReplyInput {
    id: ID
  }

  type User {
    id: ID!
    displayName: String
    name: String
    email: String
    password: String
    avatar: Avatar
    team: Team
    projects: [Project]
    tasksCreated: [Task]
    tasksAssigned: [Task]
    discussions: [Discussion]
    comments: [Comment]
    replies: [Reply]
    notifications: [Notification]
    scores: Score
    badges: [Badge]
    createdAt: String
  }
`;
