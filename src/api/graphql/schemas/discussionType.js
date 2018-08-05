export default `
  type Query {
    getDiscussions: [Discussion]
  }

  type Mutation {
    addDiscussion(input: DiscussionInput): Discussion
  }

  input DiscussionInput {
    body: String
    createdAt: String
    createdBy: ID
    upvote: Int
    replies: [ID]
  }

  type Discussion {
    id: ID!
    body: String
    createdAt: String
    createdBy: ID
    upvote: Int
    replies: [ID]
  }
`;
