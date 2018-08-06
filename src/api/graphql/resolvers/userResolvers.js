// import mongoose from 'mongoose';

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
      const user = await models.User.findById(id).populate('projects').exec()
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
      if (!(await models.User.findById(id))) throw new Error('no such id in db');

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
          $nor: [await models.User.findById(id)],
        }],
      });

      if (takenProps.length) throw new Error('email/display name is taken');

      const checkError = (e) => {
        if (e) throw new Error('cannot update user');
      };

      const user = await models.User.findByIdAndUpdate(
        id,
        {
          $set: {
            input,
            projects: {
              _id: projects.id,
            },
          },
        },
        e => checkError(e),
      )
        .then(d => d)
        .catch((e) => {
          console.log('e: ', e);
        });

      return user;
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
    projects: async (parent, arg, { models }) => {
      const project = await models.Project.findById(parent.projects);
      return project;
    },
  },
};

export default userResolvers;
