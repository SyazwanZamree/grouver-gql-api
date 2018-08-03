export default `
  type Query {
    getTeams: [Team]
    getTeam(id: ID!): Team
  }

  type Mutation {
    createTeam(input: TeamInput): Team
    updateTeam(id: ID!, input: UpdateTeamInput): Team
    deleteTeam(id: ID!): Team
  }

  input TeamInput {
    displayName: String!
    name: String!
    description: String
    avatar: AvatarInput
    memberList: [UserInput]
    projectList: [ProjectInput]
    createdAt: String
    createdBy: UserInput
  }

  input UpdateTeamInput {
    displayName: String
    name: String
    description: String
    avatar: AvatarInput
    memberList: [UserInput]
    projectList: [ProjectInput]
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
