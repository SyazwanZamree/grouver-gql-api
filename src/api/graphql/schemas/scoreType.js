export default `
  type Query {
    getScores: [Score]
  }

  type Mutation {
    addScore(input: ScoreInput): Score
  }

  input ScoreInput {
    gold: Int
    silver: Int
    bronze: Int
  }

  type Score {
    id: ID!
    gold: Int
    silver: Int
    bronze: Int
  }
`;
