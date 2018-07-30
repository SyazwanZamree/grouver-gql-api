const userResolvers = {
  Query: {
    getUsers: async (parent, args, { models }) => {
      const Users = await models.User.find();
      return Users;
    },
    getUser: async (parent, id, { models }) => {
      const User = await models.User.findById(id);
      return User;
    },
  },
  Mutation: {
    createUser: async (parent, { input }, { models }) => {
      const { displayName: display } = input;
      const takenDisplayName = await models.User.findOne({ displayName: display });

      if (takenDisplayName) {
        throw new Error('name is taken, please provide unique name');
      }

      const User = new models.User(input);

      User.save()
        .then(d => console.log('data: ', d))
        .catch(e => console.log('error: ', e));

      return User;
    },
    updateUser: (parent, { input }) => {
      const newUser = 'Hello me';
      console.log('>>>>', input);
      return newUser;
    },
  },
};

export default userResolvers;
