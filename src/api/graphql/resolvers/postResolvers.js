const postResolvers = {
  Post: {
    __resolveType: async (parent) => {
      if (parent.assignedTo) {
        console.log('ya1');
        return 'Task';
      }

      if (parent.replies) {
        console.log('ya2');
        return 'Discussion';
      }

      return null;
    },
  },
  Query: {
    getPosts: async () => {
      console.log('Holla');
    },
    getPost: async (parent, args, { models, userSession, projectSession }) => {
      console.log('models: ', models);
      console.log('userSession: ', userSession);
      console.log('projectSession: ', projectSession);
    },
  },
};

export default postResolvers;
