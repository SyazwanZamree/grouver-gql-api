import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userResolvers = {
  Query: {
    getUser: async (paret, args, { models, userSession }) => {
      if (!userSession) throw new Error('unauthorized');
      const user = await models.User.findById(userSession.id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return user;
    },
  },
  Mutation: {
    userSignUp: async (parent, {
      name,
      email,
      username,
      password,
    }, { models }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const usernameIsTaken = await models.User.findOne({ username });
      const emailIsTaken = await models.User.findOne({ email });

      if (usernameIsTaken && emailIsTaken) {
        throw new Error('user already signed up using this email');
      } else if (usernameIsTaken) {
        throw new Error('username is taken');
      } else if (emailIsTaken) {
        throw new Error('email address is already in the DB');
      }

      const user = await new models.User({
        username,
        name,
        email,
        password: hashedPassword,
      })
        .save()
        .then(d => d)
        .catch(e => console.log('error: ', e));

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        'secretTest',
      );

      return token;
    },
    userLogin: async (parent, { username, email, password }, { models }) => {
      const user = username
        ? await models.User.findOne({ username })
        : await models.User.findOne({ email });

      if (user === null) throw new Error('no user');
      if (!(await bcrypt.compare(password, user.password))) throw new Error('wrong password');

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        'secretTest',
      );

      return token;
    },
    updateUser: async (parent, {
      input,
      team,
      projects,
      tasksAssigned,
      tasksCreated,
      discussions,
      comments,
      replies,
    }, { models, userSession }) => {
      if (!userSession) throw new Error('unauthorized');

      const userTeam = [];
      const userProjects = [];
      const userCreatedTasks = [];
      const userAssignedTasks = [];
      const userDiscussions = [];
      const userComments = [];
      const userReplies = [];
      const user = await models.User.findById(userSession.id);
      const newUsername = input.username ? input.username : user.username;
      const newEmail = input.email ? input.email : user.email;
      const newName = input.name ? input.name : user.name;
      const newPassword = (input.password && !(await bcrypt.compare(input.password, user.password)))
        ? await bcrypt.hash(input.password, 10)
        : user.password;

      if (!user) throw new Error('no such id in db');
      if (input) {
        const propsIsTaken = await models.User.find({
          $and: [{
            $or: [
              { username: newUsername },
              { email: newEmail },
            ],
          },
          { $nor: [user] }],
        });
        if (propsIsTaken.length) throw new Error('email/display name is taken');
      }

      // users team update
      if (team) {
        team.forEach((el) => {
          if (user.team.indexOf(el.id) <= -1) {
            userTeam.push(el.id);
          }
        });
      }

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

      // user update. this does not works
      const userUpdate = {
        username: newUsername,
        name: newName,
        email: newEmail,
        password: newPassword,
        // avatar: (input || user).avatar,
        // score: (input || user).score,
        team: user.team.concat(userTeam),
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
        userSession.id,
        userUpdate,
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return updatedUser;
    },
    deleteUser: async (parent, { models, userSession }) => {
      if (!userSession) throw new Error('unauthorized');

      const user = await models.User.findByIdAndRemove(userSession.id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return user;
    },
  },
  User: {
    id: parent => parent.id,
    username: parent => parent.username,
    name: parent => parent.name,
    email: parent => parent.email,
    password: parent => parent.password,
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
