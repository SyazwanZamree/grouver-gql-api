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
};

export default commentResolvers;
