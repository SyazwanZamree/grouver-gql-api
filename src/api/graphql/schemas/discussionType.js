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
    createdBy: UserInput
    upvote: Int
    replies: [ReplyInput]
  }

  type Discussion {
    id: ID!
    body: String
    createdAt: String
    createdBy: User
    upvote: Int
    replies: [Reply]
  }
`;
