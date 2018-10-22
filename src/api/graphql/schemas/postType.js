// TODO: clean up typedef, i.e
// 1. do not use template string
// 2. comments
// 3. categorize properly

export default `
  interface Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String
    applause: Int
    project: Project
    applaudedBy: [User]
  }

  scalar DateTime

  enum PostType {
    TASK
    DISCUSSION
    COMMENT
    REPLY
  }

  enum TaskStatus {
    DONE
    IN_PROGRESS
  }

  enum DiscussionStatus {
    SOLVED
  }

  enum CommentStatus {
    HELPFUL
    SOLUTION
  }

  enum TaskDifficultyLevel {
    VERY_EASY
    EASY
    NORMAL
    HARD
    VERY_HARD
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    applausePost(id: ID!): Post
    createPost(input: PostInput, postType: PostType!, parentId: ID): Post

    createTask(input: TaskInput): Task
    createDiscussion(input: DiscussionInput): Discussion
    createComment(input: CommentInput): Comment
    createReply(input: ReplyInput): Reply

    updateTask(id: ID!, input: UpdateTaskInput): Task
    addTaskTag(id: ID!): Task
    markTaskStatus(id: ID!, status: TaskStatus!): Task
    addCommentToTask(id: ID!, input: CommentInput): Comment

    assignTaskDueDate(id: ID!, dueDate: DateTime): Task
    assignTaskDifficultyLevel(id: ID!, difficultyLevel: TaskDifficultyLevel!): Task
    assignTaskToUsers(taskInput: taskInput, userInput: userInput): Task

    updateDiscussion(input: UpdateDiscussionInput): Discussion
    addDiscussionTag(id: ID!): Discussion
    markDiscussionStatus(id: ID!, status: DiscussionStatus!): Discussion
    addCommentToDiscussion(id: ID!): Comment

    followDiscussion(id: ID!): User

    updateComment(input: UpdateCommentInput): Comment
    markCommentStatus(id: ID!, status: CommentStatus!): Comment
    replyComment(id: ID!): Reply

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
    applause: Int
    project: Project
    applaudedBy: [User]

    title: String
    tags: [ID]

    status: TaskStatus

    comments: [Comment]

    assignedTo: [User]
    difficultyLevel: TaskDifficultyLevel
    dueDate: DateTime
  }

  type Discussion implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String
    applause: Int
    project: Project
    applaudedBy: [User]

    title: String
    tags: [ID]

    status: DiscussionStatus

    comments: [Comment]

    follower: [User]
  }

  type Comment implements Post {
    id: ID!
    createdAt: String
    createdBy: User
    postType: String
    body: String
    applause: Int
    project: Project
    applaudedBy: [User]

    status: CommentStatus

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
    project: Project
    applaudedBy: [User]

    parentPost: Comment
  }

  input TaskInput {
    title: String
    body: String
  }

  input PostInput {
    title: String
    body: String
  }

  input taskInput {
    id: ID!
  }

  input userInput {
    id: [ID!]
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
