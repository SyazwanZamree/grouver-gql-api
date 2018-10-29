import checkUserAuthentication from './utils/authentication';
import { checkUserAuthorization } from './utils/authorization';

const commentResolvers = {
  Mutation: {
    markCommentStatus: async (parent,
      { id, status },
      { models, userSession, projectSession },
    ) => {
      const comment = await models.Post.findById(id);
      if (comment === comment.status) throw new Error('cannot reassign comment status');
      if (comment.postType !== 'COMMENT') throw new Error('Post is not of a comment type');

      let xp;

      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, comment);

      const updatedComment = await models.Post.findByIdAndUpdate(
        id,
        { status },
        (e) => {
          if (e) throw new Error('cannot update comment');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      const commentCreator = await models.User.findById(comment.createdBy);
      let currentXp = commentCreator.experiencePoint;

      if (comment.status === 'SOLUTION') {
        // SOLUTION > HELPFUL -5
        xp = -5;
      } else if (!comment.status) {
        // null > SOLUTION +10
        // null > HELPFUL +5
        xp = status === 'SOLUTION' ? 15 : 5;
      } else {
        // HELPFUL > SOLUTION +10
        xp = 10;
      }

      await models.User.findByIdAndUpdate(
        comment.createdBy,
        { experiencePoint: currentXp += xp },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedComment;
    },
    replyComment: async (parent, { id, input }, { models, userSession, projectSession }) => {
      const comment = await models.Post.findById(id);
      if (comment.postType !== 'COMMENT') throw new Error('Post is not of a comment type');

      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, comment);

      const reply = await new models.Post(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      reply.createdBy = userSession.id;
      reply.postType = 'REPLY';
      reply.parentPost = comment.id;
      reply.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      models.Post.findByIdAndUpdate(
        comment.id,
        { replies: comment.replies.concat(reply.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update comment');
        },
      )
        .then(d => d)
        .catch(er => console.log('e: ', er));

      return reply;
    },
  },
  Comment: {
    createdBy: (parent, args, { models }) => {
      const user = models.User.findById(parent.createdBy);
      return user;
    },
    project: (parent, args, { models }) => {
      const project = models.Project.findById(parent.project);
      return project;
    },
    parentPost: (parent, args, { models }) => {
      const post = models.Post.findById(parent.parentPost);
      return post;
    },
    applaudedBy: (parent, args, { models }) => {
      const users = [];
      parent.applaudedBy.forEach((e) => {
        const user = models.User.findById(e);
        users.push(user);
      });
      return users;
    },
    replies: (parent, args, { models }) => {
      const replies = [];
      parent.replies.forEach((e) => {
        const reply = models.Post.findById(e);
        replies.push(reply);
      });
      return replies;
    },
  },
};

export default commentResolvers;
