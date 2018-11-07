export default `
  type Query {
    getUser: User
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
    userLogout: User
    updateUser(input: UpdateUserInput): User
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
    invalidToken: Boolean
    teamSession: Team
    projectSession: Project
    avatar: Avatar
    team: [Team]
    projects: [Project]
    postsCreated: [Post]
    postsAssigned: [Post]
    postsFollowing: [Post]
    notifications: [Notification]
    experiencePoint: Int

    orangeBadges: [OrangeBadge]
    yellowBadges: [YellowBadge]
    greenBadges: [GreenBadge]
    blueBadges: [BlueBadge]
    indigoBadges: [IndigoBadge]
    purpleBadges: [PurpleBadge]

    createdAt: String
  }
`;
