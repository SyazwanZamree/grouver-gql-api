export default `
  type Query {
    getNotifications: [Notification]
  }

  type Mutation {
    addNotification(input: NotificationInput): Notification
  }

  input NotificationInput {
    name: String
  }

  type Notification {
    id: ID!
    name: String
  }
`;
