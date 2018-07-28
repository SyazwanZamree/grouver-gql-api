export default `
  type Query {
    getProjects: [Project]
  }

  type Mutation {
    addProject(input: ProjectInput): Project
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
