class Score {
  constructor({
    gold,
    silver,
    bronze,
  }) {
    this.gold = gold;
    this.silver = silver;
    this.bronze = bronze;
  }
}

const scoreResolvers = {
  Query: {
    getScores: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addScore: (parent, { input }) => {
      const newScore = new Score(input);
      return newScore;
    },
  },
};

export default scoreResolvers;
