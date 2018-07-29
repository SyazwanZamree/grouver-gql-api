class User {
  constructor({
    displayName,
    name,
    email,
    password,
    avatar,
    team,
    projects,
    notification,
    scores,
    badges,
    createdAt,
  }) {
    this.displayName = displayName;
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.team = team;
    this.projects = projects;
    this.notifications = notification;
    this.scores = scores;
    this.badges = badges;
    this.createdAt = createdAt;
  }
}

const userResolvers = {
  Query: {
    getUsers: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addUser: (parent, { input }) => {
      const newUser = new User(input);
      return newUser;
    },
  },
};

export default userResolvers;
