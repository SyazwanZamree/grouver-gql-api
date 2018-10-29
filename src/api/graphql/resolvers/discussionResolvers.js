import checkUserAuthentication from './utils/authentication';
import { checkUserAuthorization } from './utils/authorization';

const discussionResolvers = {
  Mutation: {
    markDiscussionStatus: async (parent,
      { id, status },
      { models, userSession, projectSession },
    ) => {
      const discussion = await models.Post.findById(id);
      if (status === discussion.status) throw new Error('cannot reassign discussion status');
      if (discussion.postType !== 'DISCUSSION') throw new Error('Post is not of a discussion type');

      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, discussion);

      const updatedDiscussion = await models.Post.findByIdAndUpdate(
        id,
        { status },
        (e) => {
          if (e) throw new Error('cannot update comment');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      const discussionCreator = await models.User.findById(discussion.createdBy);
      let currentXp = discussionCreator.experiencePoint;

      await models.User.findByIdAndUpdate(
        discussion.createdBy,
        { experiencePoint: currentXp += 2 },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedDiscussion;
    },
    followDiscussion: async (parent, { id }, { models, userSession, projectSession }) => {
      const discussion = await models.Post.findById(id);
      if (discussion.postType !== 'DISCUSSION') throw new Error('Post is not of a discussion type');

      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, discussion);

      if (discussion.followers.indexOf(userSession.id) > -1) throw new Error('user already following discussion');

      const updatedDiscussion = await models.Post.findByIdAndUpdate(
        id,
        { followers: discussion.followers.concat(userSession.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update discussion');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      await models.User.findByIdAndUpdate(
        userSession.id,
        { postsFollowing: userSession.postsFollowing.concat(id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      let getUserXp = userSession.experiencePoint;

      await models.User.findByIdAndUpdate(
        discussion.createdBy,
        { experiencePoint: getUserXp += 1 },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedDiscussion;
    },
  },
  Discussion: {
    createdBy: (parent, args, { models }) => {
      const user = models.User.findById(parent.createdBy);
      return user;
    },
    project: (parent, args, { models }) => {
      const project = models.Project.findById(parent.project);
      return project;
    },
    followers: (parent, args, { models }) => {
      const followers = [];
      parent.followers.forEach((e) => {
        const user = models.User.findById(e);
        followers.push(user);
      });
      return followers;
    },
    applaudedBy: (parent, args, { models }) => {
      const users = [];
      parent.applaudedBy.forEach((e) => {
        const user = models.User.findById(e);
        users.push(user);
      });
      return users;
    },
    comments: (parent, args, { models }) => {
      const comments = [];
      parent.comments.forEach((e) => {
        const comment = models.Post.findById(e);
        comments.push(comment);
      });
      return comments;
    },
  },
};

export default discussionResolvers;
