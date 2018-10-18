const discussionResolvers = {
  Mutation: {
    createDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
    updateDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
    removeDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
  },
};

export default discussionResolvers;
