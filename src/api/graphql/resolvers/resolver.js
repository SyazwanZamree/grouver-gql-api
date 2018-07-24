class Comment {
  constructor({
    body,
    createdAt,
    createdBy,
    upvote,
    replies,
  }) {
    this.body = body;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.upvote = upvote;
    this.replies = replies;
  }
}

class Reply {
  constructor({
    body,
    createdAt,
    createdBy,
    upvote,
  }) {
    this.body = body;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.upvote = upvote;
  }
}

class Discussion {
  constructor({
    body,
    createdAt,
    createdBy,
    upvote,
    replies,
  }) {
    this.body = body;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.upvote = upvote;
    this.replies = replies;
  }
}

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

class Avatar {
  constructor({
    smallUrl,
    mediumUrl,
    largeUrl,
  }) {
    this.smallUrl = smallUrl;
    this.mediumUrl = mediumUrl;
    this.largeUrl = largeUrl;
  }
}

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

class Task {
  constructor({
    title,
    subtitle,
    tags,
    status,
    parent,
    children,
    assignedTo,
    level,
    dueDate,
    involvedUsers,
    comments,
    createdAt,
    createdBy,
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.tags = tags;
    this.status = status;
    this.parent = parent;
    this.children = children;
    this.assignedTo = assignedTo;
    this.level = level;
    this.dueDate = dueDate;
    this.involvedUsers = involvedUsers;
    this.comments = comments;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
  }
}

class Score {
  constructor({
    gold,
    silver,
    bronze,
  }) {
    this.gold = gold;
    this.silver = silver;
    this.bronze = bronze;
  }
}

class Badge {
  constructor({
    name,
  }) {
    this.name = name;
  }
}

class Notification {
  constructor({
    name,
  }) {
    this.name = name;
  }
}

const resolvers = {
  Query: {
    hello: (parent, { name }) => {
      console.log('>>>>>>', name);
      return name;
    },
    getComments: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getDiscussions: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getProjects: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getTags: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getTasks: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getUsers: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getReplies: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getAvatar: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getTeams: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getNotifications: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getScores: (parent) => {
      console.log('parent', parent);
      return parent;
    },
    getBadges: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addComment: (parent, { input }) => {
      const newComment = new Comment(input);
      console.log('input >>>>', newComment);
      return newComment;
    },
    addDiscussion: (parent, { input }) => {
      const newDiscussion = new Discussion(input);
      console.log('input >>>>', newDiscussion);
      return newDiscussion;
    },
    addProject: (parent, { input }) => {
      const newProject = new Project(input);
      console.log('input >>>>', newProject);
      return newProject;
    },
    addTask: (parent, { input }) => {
      const newTask = new Task(input);
      console.log('input >>>>', newTask);
      return newTask;
    },
    addUser: (parent, { input }) => {
      const newUser = new User(input);
      console.log('input >>>>', newUser);
      return newUser;
    },
    addReply: (parent, { input }) => {
      const newReply = new Reply(input);
      console.log('input >>>>', newReply);
      return newReply;
    },
    addAvatar: (parent, { input }) => {
      const newAvatar = new Avatar(input);
      console.log('input >>>>', newAvatar);
      return newAvatar;
    },
    addTeam: (parent, { input }) => {
      const newTeam = new Team(input);
      console.log('input >>>>', newTeam);
      return newTeam;
    },
    addNotification: (parent, { input }) => {
      const newNotification = new Notification(input);
      console.log('input >>>>', newNotification);
      return newNotification;
    },
    addScore: (parent, { input }) => {
      const newScore = new Score(input);
      console.log('input >>>>', newScore);
      return newScore;
    },
    addBadge: (parent, { input }) => {
      const newBadge = new Badge(input);
      console.log('input >>>>', newBadge);
      return newBadge;
    },
  },
};

export default resolvers;
