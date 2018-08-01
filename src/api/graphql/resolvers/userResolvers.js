const userResolvers = {
  Query: {
    getUsers: async (parent, args, { models }) => {
      const Users = await models.User.find();
      return Users;
    },
    getUser: async (parent, { id }, { models }) => {
      console.log('id: ', id);
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

      const user = new models.User(input);

      user.save()
        .then(d => console.log('data: ', d))
        .catch(e => console.log('error: ', e));

      return user;
    },
    updateUser: async (parent, { id, input }, { models }) => {
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

      if (takenProps.length) throw new Error('sorry guys');

      const checkError = (e) => {
        if (e) throw new Error('cannot update user');
      };

      const user = await models.User.findByIdAndUpdate(
        id,
        { $set: input },
        e => checkError(e),
      );

      return user;
    },
  },
};

export default userResolvers;
