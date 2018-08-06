export default `
  interface Post {
    id: ID!
    body: String
    createdAt: String
    createdBy: ID
    upvote: Int
  }
`;
