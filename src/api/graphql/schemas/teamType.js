export default `
  type Query {
    getTeams: [Team]
    getTeam(id: ID!): Team
  }

  type Mutation {
    teamLogOut: User
    teamSignIn(id: ID!): User
    createTeam(input: TeamInput): Team
    updateTeam(id: ID!, input: UpdateTeamInput): Team
    deleteTeam(id: ID!): Team
  }

  input TeamInput {
    displayName: String!
    name: String!
    description: String
    avatar: ID
    memberList: [ID]
    projectList: [ID]
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
    memberList: [ID]
    projectList: [ID]
    createdAt: String
    createdBy: ID
  }
`;
