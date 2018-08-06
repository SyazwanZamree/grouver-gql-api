export default `
  type Query {
    getReplies: [Reply]
  }

  type Mutation {
    addReply(input: ReplyInput): Reply
  }

  input ReplyInput {
    body: String
    createdAt: String
    createdBy: ID
    upvote: Int
  }

  type Reply implements Post {
    id: ID!
    body: String
    createdAt: String
    createdBy: ID
    upvote: Int
  }
`;
