export default `
  type Query {
    getComments: [Comment]
  }

  type Mutation {
    addComment(input: CommentInput): Comment
  }

  input CommentInput {
    body: String
    createdAt: String
    createdBy: UserInput
    upvote: Int
    replies: [ReplyInput]
  }

  type Comment {
    id: ID!
    body: String
    createdAt: String
    createdBy: User
    upvote: Int
    replies: [Reply]
  }
`;
