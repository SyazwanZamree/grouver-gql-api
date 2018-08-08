// import { ObjectId } from 'mongodb';

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
    updateUser: async (parent, { id, input, projects }, { models }) => {
      const user = await models.User.findById(id);

      if (!user) throw new Error('no such id in db');

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

      const checkError = (e) => {
        if (e) throw new Error('cannot update user');
      };

      const userProjects = [];
      projects.forEach((el) => {
        if (user.projects.indexOf(el.id) <= -1) {
          userProjects.push(el.id);
        }
      });

      const userUpdate = {
        displayName: input.displayName || user.displayName,
        name: input.name || user.name,
        email: input.email || user.email,
        password: input.password || user.password,
        projects: user.projects.concat(userProjects),
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
    projects: (parent, arg, { models }) => {
      const userProjects = [];
      parent.projects.forEach((e) => {
        const project = models.Project.findById(e);
        userProjects.push(project);
      });
      return userProjects;
    },
  },
};

export default userResolvers;
