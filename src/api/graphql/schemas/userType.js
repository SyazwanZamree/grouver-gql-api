export default `
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getUserAvatar(id: ID!): Avatar
    getUserTeam(id: ID!): Team
    getUserProjects(id: ID!): Project
    getUserNotifications(id: ID!): Notification
    getUserScores(id: ID!): Score
    getUserBadges(id: ID!): Badge
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UpdateUserInput): User
    deleteUser(id: ID!): User
  }

  input UserInput {
    displayName: String!
    name: String!
    email: String!
    password: String!
    avatar: ID
    team: ID
    projects: [ID]
    notification: [ID]
    score: ID
    badge: [ID]
    createdAt: String
  }

  input UpdateUserInput {
    displayName: String
    name: String
    email: String
    password: String
    avatar: ID
    team: ID
    projects: [ID]
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
    avatar: ID
    team: ID
    projects: [ID]
    notifications: [ID]
    scores: ID
    badges: [ID]
    createdAt: String
  }
`;
