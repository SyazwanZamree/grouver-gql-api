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
    notification: [ID]
    score: ID
    badge: ID
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
    notifications: [Notification]
    scores: Score
    badges: [Badge]
    createdAt: String
  }
`;
