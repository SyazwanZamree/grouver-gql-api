// TODO:
// 1. addPostTag POST KIV
//    - first create tag, give ID. if tag already created, use the one created earlier
//    - then add tag.
//    - also update tag with taggedPost in models, tag.taggedPost = post.id
// 2. refactor code, especially the auth part. create utils.
// 3. use object assign to update model ie post.postType = 'COMMENT', post.createdBy
//    - use object to update
//    - make it look pretier
// 4. resolver flow, restructure it. ie.
//    i) find post by id
//    ii) authentication and authorization
//    iii) create post/user etc.
//    iv) update post
//    v) update other related model i.e user, other post, project etc
// 5. declare typeDef as a function instead of a string

export default `
  interface Post {
    id: ID!

    createdAt: String
    createdBy: User
    postType: String
    project: Project

    body: String

    applause: Int
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
    # general mutation
    createPost(input: PostInput, postType: PostType!, parentId: ID): Post
    updatePost(id: ID!, input: UpdatePostInput): Post
    applausePost(id: ID!): Post
    addCommentToPost(id: ID!, input: PostInput): Comment
    addPostTag(id: ID!): Post
    removePost(id: ID!): Post

    # task specific mutation
    markTaskStatus(id: ID!, status: TaskStatus!): Task
    assignTaskDueDate(id: ID!, dueDate: DateTime): Task
    assignTaskDifficultyLevel(id: ID!, difficultyLevel: TaskDifficultyLevel!): Task
    assignTaskToUsers(
      taskIdInput: TaskIdInput,
      userIdInput: UserIdInput
    ): Task

    # discussion specific mutation
    markDiscussionStatus(id: ID!, status: DiscussionStatus!): Discussion
    followDiscussion(id: ID!): Discussion

    # comment specific mutation
    markCommentStatus(id: ID!, status: CommentStatus!): Comment
    replyComment(id: ID!, input: PostInput): Reply
  }

  type Task implements Post {
    id: ID!

    createdAt: String
    createdBy: User
    postType: String
    project: Project

    title: String
    body: String

    status: TaskStatus
    difficultyLevel: TaskDifficultyLevel
    dueDate: DateTime
    assignedTo: [User]

    applause: Int
    applaudedBy: [User]
    comments: [Comment]
    tags: [ID]
  }

  type Discussion implements Post {
    id: ID!

    createdAt: String
    createdBy: User
    postType: String
    project: Project

    title: String
    body: String

    status: DiscussionStatus
    followers: [User]

    applause: Int
    applaudedBy: [User]
    comments: [Comment]
    tags: [ID]
  }

  type Comment implements Post {
    id: ID!

    createdAt: String
    createdBy: User
    postType: String
    project: Project

    body: String

    status: CommentStatus
    parentPost: Post

    applause: Int
    applaudedBy: [User]
    replies: [Reply]
  }

  type Reply implements Post {
    id: ID!

    createdAt: String
    createdBy: User
    postType: String
    project: Project

    body: String

    parentPost: Comment

    applause: Int
    applaudedBy: [User]
  }

  input PostInput {
    title: String
    body: String
  }

  input UpdatePostInput {
    title: String
    body: String!
  }

  input TaskIdInput {
    id: ID!
  }

  input UserIdInput {
    id: [ID!]
  }
`;
