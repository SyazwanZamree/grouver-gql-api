class Avatar {
  constructor({
    smallUrl,
    mediumUrl,
    largeUrl,
  }) {
    this.smallUrl = smallUrl;
    this.mediumUrl = mediumUrl;
    this.largeUrl = largeUrl;
  }
}

const avatarResolvers = {
  Query: {
    getAvatar: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addAvatar: (parent, { input }) => {
      const newAvatar = new Avatar(input);
      return newAvatar;
    },
  },
};

export default avatarResolvers;
