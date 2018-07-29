import { mergeTypes } from 'merge-graphql-schemas';
import avatarType from './avatarType';
import badgeType from './badgeType';
import commentType from './commentType';
import discussionType from './discussionType';
import levelType from './levelType';
import notificationType from './notificationType';
import projectType from './projectType';
import replyType from './replyType';
import scoreType from './scoreType';
import statusType from './statusType';
import tagType from './tagType';
import taskType from './taskType';
import teamType from './teamType';
import userType from './userType';

const typesArray = [
  avatarType,
  badgeType,
  commentType,
  discussionType,
  levelType,
  notificationType,
  projectType,
  replyType,
  scoreType,
  statusType,
  tagType,
  taskType,
  teamType,
  userType,
];

export default mergeTypes(typesArray);
