import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userResolvers = {
  Query: {
    getUser: async (paret, args, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

      const user = await models.User.findById(userSession.id)
        .then(d => d)
        .catch(e => console.log('e', e));

      user.experiencePoint = 0;
      user.save()
        .then(d => d)
        .catch(e => console.log('error: ', e));

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
        experiencePoint: 0,
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

      await models.User.findByIdAndUpdate(
        user.id,
        { invalidToken: false },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

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
    userLogout: async (parent, args, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

      const user = await models.User.findByIdAndUpdate(
        userSession.id,
        { invalidToken: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return user;
    },
    updateUser: async (parent, { input }, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

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

      const userUpdate = {
        username: newUsername,
        name: newName,
        email: newEmail,
        password: newPassword,
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
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

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
    avatar: parent => parent.avatar,
    team: (parent, arg, { models }) => {
      const userTeams = [];
      parent.team.forEach((e) => {
        const team = models.Team.findById(e);
        userTeams.push(team);
      });
      return userTeams;
    },
    teamSession: (parent, args, { models }) => {
      const userTeamSession = models.Team.findById(parent.teamSession);
      return userTeamSession;
    },
    projects: (parent, arg, { models }) => {
      const userProjects = [];
      parent.projects.forEach((e) => {
        const project = models.Project.findById(e);
        userProjects.push(project);
      });
      return userProjects;
    },
    projectSession: (parent, arg, { models }) => {
      const userProjectSession = models.Project.findById(parent.projectSession);
      return userProjectSession;
    },
    postsCreated: (parent, arg, { models }) => {
      const userCreatedPosts = [];
      parent.postsCreated.forEach((e) => {
        const post = models.Post.findById(e);
        userCreatedPosts.push(post);
      });
      return userCreatedPosts;
    },
    postsAssigned: (parent, arg, { models }) => {
      const userAssignedPosts = [];
      parent.postsAssigned.forEach((e) => {
        const post = models.Post.findById(e);
        userAssignedPosts.push(post);
      });
      return userAssignedPosts;
    },
    postsFollowing: (parent, arg, { models }) => {
      const userFollowingPosts = [];
      parent.postsFollowing.forEach((e) => {
        const post = models.Post.findById(e);
        userFollowingPosts.push(post);
      });
      return userFollowingPosts;
    },
    notifications: parent => parent.notifications,
    experiencePoint: parent => parent.experiencePoint,
    badges: parent => parent.badges,
    createdAt: parent => parent.createdAt,
  },
};

export default userResolvers;
