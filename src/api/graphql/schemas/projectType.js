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
    avatar: AvatarInput
    memberList: [UserInput]
    taskList: [TaskInput]
    createdAt: String
    createdBy: UserInput
  }

  input UpdateProjectInput {
    displayName: String
    name: String
    description: String
    avatar: AvatarInput
    memberList: [UserInput]
    taskList: [TaskInput]
  }

  type Project {
    id: ID!
    displayName: String
    name: String
    description: String
    avatar: Avatar
    memberList: [User]
    taskList: [Task]
    createdAt: String
    createdBy: User
  }
`;
