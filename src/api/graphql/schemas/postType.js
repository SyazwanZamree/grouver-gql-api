export default `
  interface Post {
    id: ID!
    body: String
    postType: String
    createdAt: String
    createdBy: User
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

    updateTask(input: UpdateTaskInput): Task
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
    title: String
    body: String
    tags: [ID]
    status: ID
    applause: Int
    assignedTo: [User]
    level: ID
    dueDate: String
    comments: [Comment]
  }

  type Discussion implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    title: String
    body: String
    tags: [ID]
    status: ID
    follower: [User]
    applause: Int
    comments: [Comment]
  }

  type Comment implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    parentPost: Post
    body: String
    status: ID
    applause: Int
    reply: [Reply]
  }

  type Reply implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    parentComment: Comment
    body: String
    applause: Int
  }

  input TaskInput {
    body: String!
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
