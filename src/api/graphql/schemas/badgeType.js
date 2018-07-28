export default `
  type Query {
    getBadges: [Badge]
  }

  type Mutation {
    addBadge(input: BadgeInput): Badge
  }

  input BadgeInput {
    name: String
  }

  type Badge {
    id: ID!
    name: String
  }
`;
