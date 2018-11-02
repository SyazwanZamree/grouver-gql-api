export default `
  type Tag {
    id: ID
    body: String
    posts: [Post]
    project: Project
  }

  type Query {
    getTags: [Tag]
    getTag(id: ID!): Tag
    searchTag(input: String): [Tag]
  }

  type Mutation {
    createTag(body: String!, postIdInput: ID): Tag
    assignPostToTag(tagIdInput: ID! postIdInput: ID!): Tag
  }
`;
