class Discussion {
  constructor({
    body,
    createdAt,
    createdBy,
    upvote,
    replies,
  }) {
    this.body = body;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.upvote = upvote;
    this.replies = replies;
  }
}

const discussionResolvers = {
  Query: {
    getDiscussions: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addDiscussion: (parent, { input }) => {
      const newDiscussion = new Discussion(input);
      return newDiscussion;
    },
  },
};

export default discussionResolvers;
