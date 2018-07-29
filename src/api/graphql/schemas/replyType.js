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
    createdBy: UserInput
    upvote: Int
  }

  type Reply {
    id: ID!
    body: String
    createdAt: String
    createdBy: User
    upvote: Int
  }
`;
