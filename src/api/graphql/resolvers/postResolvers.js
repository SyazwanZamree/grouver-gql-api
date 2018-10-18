const postResolvers = {
  Query: {
    getPosts: async (parent, args, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const posts = await models.Post.find({
        _id: { $in: projectSession.postList },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return posts;
    },
    getPost: async (parent, args, { models, userSession, projectSession }) => {
      console.log('models: ', models);
      console.log('userSession: ', userSession);
      console.log('projectSession: ', projectSession);
    },
  },
  Post: {
    __resolveType: async (parent) => {
      if (parent.assignedTo) {
        console.log('task');
        return 'Task';
      }

      if (parent.replies) {
        console.log('discussion');
        return 'Discussion';
      }

      if (parent.parentPost) {
        console.log('comment');
        return 'Comment';
      }

      if (parent.parentComment) {
        console.log('reply');
        return 'Reply';
      }

      return null;
    },
  },
};

export default postResolvers;
