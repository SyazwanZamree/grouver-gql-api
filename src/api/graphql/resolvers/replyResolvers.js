class Reply {
  constructor({
    body,
    createdAt,
    createdBy,
    upvote,
  }) {
    this.body = body;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.upvote = upvote;
  }
}

const replyResolvers = {
  Query: {
    getAvatar: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addReply: (parent, { input }) => {
      const newReply = new Reply(input);
      return newReply;
    },
  },
};

export default replyResolvers;
