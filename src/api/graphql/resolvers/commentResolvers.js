const commentResolvers = {
  Mutation: {
    createComment: (parent, { input }) => {
      console.log('input: ', input);
    },
    updateComment: (parent, { input }) => {
      console.log('input: ', input);
    },
    markCommentStatus: (parent, { input }) => {
      console.log('input: ', input);
    },
    replyComment: (parent, { input }) => {
      console.log('input: ', input);
    },
    removeComment: (parent, { input }) => {
      console.log('input: ', input);
    },
  },
  Comment: {
    createdBy: (parent, args, { models }) => {
      const user = models.User.findById(parent.createdBy);
      return user;
    },
    parentPost: (parent, args, { models }) => {
      const post = models.Post.findById(parent.parentPost);
      return post;
    },
  },
};

export default commentResolvers;
