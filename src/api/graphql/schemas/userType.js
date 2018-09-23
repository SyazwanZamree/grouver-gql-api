export default `
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    userSignUp(
      name: String!
      username: String!
      email: String!
      password: String!
    ): String
    userLogin(
      email: String
      username: String
      password: String!
    ): String
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
    username: String!
    name: String!
    email: String!
    password: String!
    createdAt: String
  }

  input UpdateUserInput {
    username: String
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
    username: String
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
