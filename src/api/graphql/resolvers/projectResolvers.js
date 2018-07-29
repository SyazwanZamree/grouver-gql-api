class Project {
  constructor({
    displayName,
    name,
    description,
    avatar,
    memberList,
    taskList,
    createdAt,
    createdBy,
  }) {
    this.displayName = displayName;
    this.name = name;
    this.description = description;
    this.avatar = avatar;
    this.memberList = memberList;
    this.taskList = taskList;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

const projectResolvers = {
  Query: {
    getProjects: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addProject: (parent, { input }) => {
      const newProject = new Project(input);
      return newProject;
    },
  },
};

export default projectResolvers;
