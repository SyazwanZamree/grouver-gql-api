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
