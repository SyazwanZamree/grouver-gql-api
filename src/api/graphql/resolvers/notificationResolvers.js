class Notification {
  constructor({
    name,
  }) {
    this.name = name;
  }
}

const notificationResolvers = {
  Query: {
    getNotifications: (parent) => {
      console.log('parent', parent);
      return parent;
    },
  },
  Mutation: {
    addNotification: (parent, { input }) => {
      const newNotification = new Notification(input);
      return newNotification;
    },
  },
};

export default notificationResolvers;
