const userResolvers = {
  Query: {
    getUsers: async (parent, args, { models }) => {
      const users = await models.User.find()
        .then(d => d)
        .catch(e => console.log('e', e));

      return users;
    },
    getUser: async (parent, { id }, { models }) => {
      if (!(await models.User.findById(id))) throw new Error('no such id in db');
      const user = await models.User.findById(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return user;
    },
  },
  Mutation: {
    createUser: async (parent, { input }, { models }) => {
      const {
        displayName: inputDisplayName,
        email: inputEmail,
      } = input;

      const takenDisplayName = await models.User.findOne({ displayName: inputDisplayName });
      const takenEmail = await models.User.findOne({ email: inputEmail });

      if (takenDisplayName && takenEmail) {
        throw new Error('user already signed up using this email');
      } else if (takenDisplayName) {
        throw new Error('display name is taken');
      } else if (takenEmail) {
        throw new Error('email address is already in the DB');
      }

      const user = new models.User(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error: ', e));

      return user;
    },
    updateUser: async (parent, {
      id,
      input,
      projects,
      tasksCreated,
      tasksAssigned,
      discussions,
      comments,
      replies,
    }, { models }) => {
      const user = await models.User.findById(id);
      const userProjects = [];
      const userCreatedTasks = [];
      const userAssignedTasks = [];
      const userDiscussions = [];
      const userComments = [];
      const userReplies = [];

      if (!user) throw new Error('no such id in db');
      // general user update via input
      if (input) {
        const {
          displayName: inputDisplayName,
          email: inputEmail,
        } = input;

        const takenProps = await models.User.find({
          $and: [{
            $or: [
              { displayName: inputDisplayName },
              { email: inputEmail },
            ],
          },
          {
            $nor: [user],
          }],
        });

        if (takenProps.length) throw new Error('email/display name is taken');
      }

      const checkError = (e) => {
        if (e) throw new Error('cannot update user');
      };

      // users projects update
      if (projects) {
        projects.forEach((el) => {
          if (user.projects.indexOf(el.id) <= -1) {
            userProjects.push(el.id);
          }
        });
      }

      // users task created update
      if (tasksCreated) {
        tasksCreated.forEach((el) => {
          if (user.tasksCreated.indexOf(el.id) <= -1) {
            userCreatedTasks.push(el.id);
          }
        });
      }

      // users task assigned update
      if (tasksAssigned) {
        tasksAssigned.forEach((el) => {
          if (user.tasksAssigned.indexOf(el.id) <= -1) {
            userAssignedTasks.push(el.id);
          }
        });
      }

      // users discussion created update; currently discussion cannot be created
      // will be available after discussions model, type and resolvers are done
      if (discussions) {
        discussions.forEach((el) => {
          if (user.discussions.indexOf(el.id) <= -1) {
            userDiscussions.push(el.id);
          }
        });
      }

      // users comments created update; currently comment cannot be created
      // will be available after comments model, type and resolvers are done
      if (comments) {
        comments.forEach((el) => {
          if (user.comments.indexOf(el.id) <= -1) {
            userComments.push(el.id);
          }
        });
      }

      // users reply created update; currently reply cannot be created
      // will be available after replies model, type and resolvers are done
      if (replies) {
        replies.forEach((el) => {
          if (user.replies.indexOf(el.id) <= -1) {
            userReplies.push(el.id);
          }
        });
      }

      // user update
      const userUpdate = {
        displayName: (input || user).displayName,
        name: (input || user).name,
        email: (input || user).email,
        password: (input || user).password,
        // avatar: (input || user).avatar,
        // team: (input || user).team,
        // score: (input || user).score,
        projects: user.projects.concat(userProjects),
        tasksCreated: user.tasksCreated.concat(userCreatedTasks),
        tasksAssigned: user.tasksAssigned.concat(userAssignedTasks),
        //
        // update for discussions, comments and replies will be added later
        // when their resolvers, models and types are done
        //
        // discussions: user.discussions.concat(userDiscussions),
        // comments: user.comments.concat(userComments),
        // replies: user.replies.concat(userReplies),
        // 
        // notifications: user.notifications.concat(userNotifications),
        // badges: user.badges.concat(userBadges),
      };

      const updatedUser = await models.User.findByIdAndUpdate(
        id,
        userUpdate,
        e => checkError(e),
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return updatedUser;
    },
    deleteUser: async (parent, { id }, { models }) => {
      if (!(await models.User.findById(id))) throw new Error('no such id in db');

      const user = await models.User.findByIdAndRemove(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return user;
    },
  },
  User: {
    id: parent => parent.id,
    displayName: parent => parent.displayName,
    name: parent => parent.name,
    email: parent => parent.email,
    password: parent => parent.password, // i dont think we can query even crypted password
    avatar: parent => parent.avatar,
    team: parent => parent.team,
    projects: (parent, arg, { models }) => {
      const userProjects = [];
      parent.projects.forEach((e) => {
        const project = models.Project.findById(e);
        userProjects.push(project);
      });
      return userProjects;
    },
    tasksCreated: (parent, arg, { models }) => {
      const userCreatedTasks = [];
      parent.tasksCreated.forEach((e) => {
        const task = models.Task.findById(e);
        userCreatedTasks.push(task);
      });
      return userCreatedTasks;
    },
    tasksAssigned: (parent, arg, { models }) => {
      const userAssignedTasks = [];
      parent.tasksAssigned.forEach((e) => {
        const task = models.Task.findById(e);
        userAssignedTasks.push(task);
      });
      return userAssignedTasks;
    },
    // add task assigned mark and applause count
    // to do list:
    //  1. discussionsCreated
    //    - discussionsCreated applause count
    //    - discussionsCreated follower count
    //    - discussionsCreated status mark
    //  2. commentsCreated
    //    - commentsCreated applause count
    //    - commentsCreated follower count
    //    - commentsCreated status mark
    //  3. repliesCreated
    //    - repliesCreated applause count
    notifications: parent => parent.notifications,
    scores: parent => parent.scores,
    badges: parent => parent.badges,
    createdAt: parent => parent.createdAt,
  },
};

export default userResolvers;
