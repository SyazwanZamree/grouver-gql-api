import { mergeResolvers } from 'merge-graphql-schemas';
import avatarResolvers from './avatarResolvers';
import badgeResolvers from './badgeResolvers';
import commentResolvers from './commentResolvers';
import discussionResolvers from './discussionResolvers';
// import levelResolvers from './levelResolvers';
import notificationResolvers from './notificationResolvers';
import projectResolvers from './projectResolvers';
import replyResolvers from './replyResolvers';
import scoreResolvers from './scoreResolvers';
// import statusResolvers from './statusResolvers';
// import tagResolvers from './tagResolvers';
import taskResolvers from './taskResolvers';
import teamResolvers from './teamResolvers';
import userResolvers from './userResolvers';

const resolversArray = [
  avatarResolvers,
  badgeResolvers,
  commentResolvers,
  discussionResolvers,
  // levelResolvers,
  notificationResolvers,
  projectResolvers,
  replyResolvers,
  scoreResolvers,
  // statusResolvers,
  // tagResolvers,
  taskResolvers,
  teamResolvers,
  userResolvers,
];

export default mergeResolvers(resolversArray);
