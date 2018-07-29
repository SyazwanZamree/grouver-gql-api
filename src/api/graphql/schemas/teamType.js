export default `
  type Query {
    getTeams: [Team]
  }

  type Mutation {
    addTeam(input: TeamInput): Team
  }

  input TeamInput {
    displayName: String
    name: String
    description: String
    avatar: AvatarInput
    memberList: [UserInput]
    projectList: [ProjectInput]
    createdAt: String
    createdBy: UserInput
  }

  type Team {
    id: ID!
    displayName: String
    name: String
    description: String
    avatar: Avatar
    memberList: [User]
    projectList: [Project]
    createdAt: String
    createdBy: User
  }
`;
