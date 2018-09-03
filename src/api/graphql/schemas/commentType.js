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
    createdBy: ID
    upvote: Int
    replies: [ID]
  }

  type Comment implements Post {
    id: ID!
    body: String
    createdAt: String
    createdBy: ID
    upvote: Int
    replies: [ID]
  }
`;
