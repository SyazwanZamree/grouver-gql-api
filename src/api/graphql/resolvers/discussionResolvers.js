const discussionResolvers = {
  Mutation: {
    createDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
    updateDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
    addDiscussionTag: (parent, { input }) => {
      console.log('input: ', input);
    },
    markDiscussionStatus: (parent, { input }) => {
      console.log('input: ', input);
    },
    followDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
    addCommentToDiscussion: async () => {
      console.log('addCommentToTask');
    },
    removeDiscussion: (parent, { input }) => {
      console.log('input: ', input);
    },
  },
  Discussion: {
    createdBy: (parent, args, { models }) => {
      const user = models.User.findById(parent.createdBy);
      return user;
    },
  },
};

export default discussionResolvers;
