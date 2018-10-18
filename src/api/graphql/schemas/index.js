import { mergeTypes } from 'merge-graphql-schemas';
import avatarType from './avatarType';
import badgeType from './badgeType';
import levelType from './levelType';
import notificationType from './notificationType';
import postType from './postType';
import projectType from './projectType';
import scoreType from './scoreType';
import statusType from './statusType';
import tagType from './tagType';
import teamType from './teamType';
import userType from './userType';

const typesArray = [
  avatarType,
  badgeType,
  levelType,
  notificationType,
  postType,
  projectType,
  scoreType,
  statusType,
  tagType,
  teamType,
  userType,
];

export default mergeTypes(typesArray);
