export default `
  type Query {
    getAvatar: [Avatar]
  }

  type Mutation {
    addAvatar(input: AvatarInput): Avatar
  }

  input AvatarInput {
    smallUrl: String
    mediumUrl: String
    largeUrl: String
  }

  type Avatar {
    id: ID!
    smallUrl: String
    mediumUrl: String
    largeUrl: String
  }
`;
