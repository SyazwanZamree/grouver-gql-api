import { GraphQLScalarType } from 'graphql';

import checkUserAuthentication from './utils/authentication';
import { checkUserAuthorization, checkPostCreator } from './utils/authorization';

const postResolvers = {
  Query: {
    getPosts: async (parent, args, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const posts = await models.Post.find({
        _id: { $in: projectSession.postList },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return posts;
    },
    getPost: async (parent, args, { models, userSession, projectSession }) => {
      console.log('models: ', models);
      console.log('userSession: ', userSession);
      console.log('projectSession: ', projectSession);
    },
  },
  Mutation: {
    createPost: async (parent,
      { input, postType, parentId },
      { models, userSession, projectSession },
    ) => {
      checkUserAuthentication(userSession, projectSession);
      const { title, body } = input;
      const post = await new models.Post({ body });
      const parentPost = parentId ? await models.Post.findById(parentId) : null;

      post.postType = postType;
      post.createdBy = userSession.id;
      post.applause = 0;
      post.project = projectSession.id;

      switch (postType) {
        case 'TASK':
        case 'DISCUSSION':
          if (parentId) throw new Error('Post doesnt need parent');
          post.title = title;
          post.tags = [];
          break;
        case 'COMMENT': {
          if ((parentPost.postType !== 'TASK') && (parentPost.postType !== 'DISCUSSION')) {
            throw new Error('parent is not a task or discussion');
          }
          post.parentPost = post.parentPost.concat(parentPost);
          break;
        }
        case 'REPLY': {
          if (!parentPost.reply) throw new Error('parent is not a comment');
          post.parentPost = post.parentPost.concat(parentPost);
          break;
        }
        default:
          console.log('sorry, no type');
      }

      post.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      await models.Project.findByIdAndUpdate(
        projectSession.id,
        { postList: await projectSession.postList.concat(post.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update project');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      let getUserXp = userSession.experiencePoint;
      const xp = postType === 'REPLY' ? 1 : 2;

      await models.User.findByIdAndUpdate(
        userSession.id,
        {
          postsCreated: await userSession.postsCreated.concat(post.id),
          experiencePoint: getUserXp += xp,
        },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return post;
    },
    updatePost: async (parent, { id, input }, { models, userSession, projectSession }) => {
      const post = await models.Post.findById(id);

      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, post);
      checkPostCreator(userSession, post);

      const { body } = input;
      const updateInput = post.postType === ('TASK' || 'DISCUSSION') ? input : { body };

      if (post.postType === ('COMMENT' || 'REPLY') && input.title) {
        throw new Error('comment and reply cannot contain title');
      }

      const updatedPost = await models.Post.findByIdAndUpdate(
        id,
        { $set: updateInput },
        (e) => {
          if (e) throw new Error('cannot update task');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedPost;
    },
    applausePost: async (parent, { id }, { models, userSession, projectSession }) => {
      const post = await models.Post.findById(id);
      const postCreator = await models.User.findById(post.createdBy);
      const xp = post.postType === 'REPLY' ? 1 : 2;
      let currentXp = postCreator.experiencePoint;

      checkUserAuthorization(userSession, projectSession, post);

      const applauderIndex = post.applaudedBy.indexOf(userSession.id);
      if (applauderIndex > -1) throw new Error('user already aplause');

      post.applause += 1;
      post.applaudedBy = post.applaudedBy.concat(userSession.id);

      post.save()
        .then(d => d)
        .catch(e => console.log('e', e));

      await models.User.findByIdAndUpdate(
        post.createdBy,
        { experiencePoint: currentXp += xp },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return post;
    },
    addCommentToPost: async (parent, { id, input }, { models, userSession, projectSession }) => {
      const post = await models.Post.findById(id);

      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, post);

      const comment = await new models.Post(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      comment.createdBy = userSession.id;
      comment.postType = 'COMMENT';
      comment.parentPost = post.id;
      comment.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      models.Post.findByIdAndUpdate(
        post.id,
        { comments: post.comments.concat(comment.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update post');
        },
      )
        .then(d => d)
        .catch(er => console.log('e: ', er));

      return comment;
    },
    addPostTag: async () => {
      // TODO: restructure how tagging should work. should it be a user generated
      // string with id in db, or enum?
      console.log('addPostTag');
    },
    removePost: async (parent, { id }, { models, userSession, projectSession }) => {
      const post = await models.Post.findById(id);

      checkUserAuthorization(userSession, projectSession, post);
      checkPostCreator(userSession, post);

      const removedPost = await models.Post.findByIdAndRemove(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return removedPost;
    },
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: ' date and time, represented as an ISO-8601 string',
    serialize: value => value.toISOString(),
    parseValue: value => new Date(value),
    parseLiteral: ast => new Date(ast.value),
  }),
  Post: {
    __resolveType: async (parent) => {
      if (parent.postType === 'TASK') {
        console.log('task');
        return 'Task';
      }

      if (parent.postType === 'DISCUSSION') {
        console.log('discussion');
        return 'Discussion';
      }

      if (parent.postType === 'COMMENT') {
        console.log('comment');
        return 'Comment';
      }

      if (parent.postType === 'REPLY') {
        console.log('reply');
        return 'Reply';
      }

      return null;
    },
  },
};

export default postResolvers;
