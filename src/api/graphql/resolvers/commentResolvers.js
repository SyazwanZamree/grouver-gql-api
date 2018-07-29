class Comment {
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

const commentResolvers = {
  Query: {
    getComments: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addComment: (parent, { input }, { models }) => {
      const newComment = new Comment(input);
      return newComment;
    },
  },
};

export default commentResolvers;
