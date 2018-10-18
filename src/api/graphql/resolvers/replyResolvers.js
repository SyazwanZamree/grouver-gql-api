const replyResolvers = {
  Mutation: {
    createReply: (parent, { input }) => {
      console.log('input: ', input);
    },
    updateReply: (parent, { input }) => {
      console.log('input: ', input);
    },
    removeReply: (parent, { input }) => {
      console.log('input: ', input);
    },
  },
};

export default replyResolvers;
