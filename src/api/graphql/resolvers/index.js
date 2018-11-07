import { mergeResolvers } from 'merge-graphql-schemas';
import avatarResolvers from './avatarResolvers';
// import badgeResolvers from './badgeResolvers';
import commentResolvers from './commentResolvers';
import discussionResolvers from './discussionResolvers';
import notificationResolvers from './notificationResolvers';
import postResolvers from './postResolvers';
import projectResolvers from './projectResolvers';
import replyResolvers from './replyResolvers';
import scoreResolvers from './scoreResolvers';
import tagResolvers from './tagResolvers';
import taskResolvers from './taskResolvers';
import teamResolvers from './teamResolvers';
import userResolvers from './userResolvers';

const resolversArray = [
  avatarResolvers,
  // badgeResolvers,
  commentResolvers,
  discussionResolvers,
  notificationResolvers,
  postResolvers,
  projectResolvers,
  replyResolvers,
  scoreResolvers,
  tagResolvers,
  taskResolvers,
  teamResolvers,
  userResolvers,
];

export default mergeResolvers(resolversArray);
