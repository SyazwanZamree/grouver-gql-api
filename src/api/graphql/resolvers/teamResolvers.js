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
    getTeams: async (parent, args, { models }) => {
      const teams = await models.Team.find()
        .then(d => d)
        .catch(e => console.log('e', e));

      return teams;
    },
    getTeam: async (parent, { id }, { models }) => {
      if (!(await models.Team.findById(id))) throw new Error('no such id in db');
      const team = await models.Team.findById(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return team;
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
