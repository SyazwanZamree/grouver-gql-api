export default `
  type Query {
    getProjects: [Project]
    getProject(id: ID!): Project
  }

  type Mutation {
    projectLogin(id: ID!): User
    projectLogout: User
    addProjectToUser(id: ID!): User
    removeProjectFromUser(id: ID!): User
    createProject(input: ProjectInput): Project
    updateProject(id: ID!, input: UpdateProjectInput): Project
    deleteProject(id: ID!): Project
  }

  input ProjectInput {
    id: ID
    displayName: String
    name: String
    description: String
    avatar: ID
    memberList: [ID]
    taskList: [ID]
    createdAt: String
    createdBy: ID
  }

  input UpdateProjectInput {
    displayName: String
    name: String
    description: String
    avatar: ID
    memberList: [ID]
    taskList: [ID]
  }

  type Project {
    id: ID!
    displayName: String
    name: String
    description: String
    avatar: ID
    team: Team
    adminList: [User]
    memberList: [User]
    taskList: [ID]
    createdAt: String
    createdBy: ID
  }
`;
