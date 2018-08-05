export default `
  type Query {
    getProjects: [Project]
    getProject(id: ID!): Project
  }

  type Mutation {
    createProject(input: ProjectInput): Project
    updateProject(id: ID!, input: UpdateProjectInput): Project
    deleteProject(id: ID!): Project
  }

  input ProjectInput {
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
    memberList: [ID]
    taskList: [ID]
    createdAt: String
    createdBy: ID
  }
`;
