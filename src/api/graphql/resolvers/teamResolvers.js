class Team {
  constructor({
    displayName,
    name,
    description,
    avatar,
    memberList,
    projectList,
    createdAt,
    createdBy,
  }) {
    this.displayName = displayName;
    this.name = name;
    this.description = description;
    this.avatar = avatar;
    this.memberList = memberList;
    this.projectList = projectList;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

const teamResolvers = {
  Query: {
    getTeams: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addTeam: (parent, { input }) => {
      const newTeam = new Team(input);
      return newTeam;
    },
  },
};

export default teamResolvers;
