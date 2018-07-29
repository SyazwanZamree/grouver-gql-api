export default `
  type Query {
    getUsers: [User]
  }

  type Mutation {
    addUser(input: UserInput): User
  }

  input UserInput {
    displayName: String
    name: String
    email: String
    password: String
    avatar: AvatarInput
    team: TeamInput
    projects: [ProjectInput]
    notification: [NotificationInput]
    score: ScoreInput
    badge: BadgeInput
    createdAt: String
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
