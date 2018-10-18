export default `
  interface Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createTask(input: TaskInput): Task
    createDiscussion(input: DiscussionInput): Discussion
    createComment(input: CommentInput): Comment
    createReply(input: ReplyInput): Reply

    updateTask(id: ID!, input: UpdateTaskInput): Task
    updateDiscussion(input: UpdateDiscussionInput): Discussion
    updateComment(input: UpdateCommentInput): Comment
    updateReply(input: UpdateReplyInput): Reply

    removeTask(id: ID!): Task
    removeDiscussion(id: ID!): Discussion
    removeComment(id: ID!): Comment
    removeReply(id: ID!): Reply
  }

  type Task implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String

    title: String
    project: Project
    tags: [ID]
    applause: Int

    status: ID

    comments: [Comment]

    assignedTo: [User]
    level: Int
    dueDate: String
  }

  type Discussion implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String

    title: String
    project: Project
    tags: [ID]
    applause: Int

    status: ID

    comments: [Comment]

    follower: [User]
  }

  type Comment implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String

    status: ID

    applause: Int

    parentPost: Post
    reply: [Reply]
  }

  type Reply implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String

    applause: Int

    parentComment: Comment
  }

  input TaskInput {
    title: String
    body: String
  }

  input DiscussionInput {
    body: String!
  }

  input CommentInput {
    body: String!
  }

  input ReplyInput {
    body: String!
  }

  input UpdateTaskInput {
    title: String
    body: String!
  }

  input UpdateDiscussionInput {
    body: String!
  }

  input UpdateCommentInput {
    body: String!
  }

  input UpdateReplyInput {
    body: String!
  }
`;
