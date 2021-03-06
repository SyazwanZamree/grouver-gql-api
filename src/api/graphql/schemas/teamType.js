export default `
  type Query {
    getTeams: [Team]
    getTeam(id: ID!): Team
  }

  type Mutation {
    teamLogOut: User
    teamSignIn(id: ID!): User
    createTeam(input: TeamInput): Team
    updateTeam(input: UpdateTeamInput): Team
    addTeamsUser(id: ID!): User
    removeTeamsUser(id: ID!): User
    deleteTeam: Team
  }

  input TeamInput {
    displayName: String!
    name: String!
    description: String
    avatar: ID
    createdAt: String
    createdBy: ID
  }

  input UpdateTeamInput {
    displayName: String
    name: String
    description: String
    avatar: ID
    memberList: [ID]
    projectList: [ID]
    createdBy: ID
  }

  type Team {
    id: ID!
    displayName: String
    name: String
    description: String
    avatar: ID
    adminList: [User]
    memberList: [User]
    projectList: [Project]
    createdAt: String
    createdBy: User
  }
`;
