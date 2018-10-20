import { mergeTypes } from 'merge-graphql-schemas';
import avatarType from './avatarType';
import badgeType from './badgeType';
import notificationType from './notificationType';
import postType from './postType';
import projectType from './projectType';
import scoreType from './scoreType';
import tagType from './tagType';
import teamType from './teamType';
import userType from './userType';

const typesArray = [
  avatarType,
  badgeType,
  notificationType,
  postType,
  projectType,
  scoreType,
  tagType,
  teamType,
  userType,
];

export default mergeTypes(typesArray);
