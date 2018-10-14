import { GraphQLServer } from 'graphql-yoga';
import jwt from 'jsonwebtoken';

import resolvers from './resolvers/index';
import typeDefs from './schemas/index';
import models from './../database/models/index';

async function context(d) {
  const {
    authorization,
  } = d.request.headers;

  const getUserSession = async (x) => {
    if (x !== undefined) {
      const valid = jwt.verify(x, 'secretTest', (err, result) => {
        if (err) throw new Error('invalid token');

        return result;
      });

      if (valid) {
        const user = await models.User.findById(valid.id)
          .then(id => id)
          .catch(e => console.log('e: ', e));

        return user;
      }
    }
    return null;
  };

  const token = await authorization ? authorization.split('Bearer ')[1] : undefined;
  const userSession = await getUserSession(token)
    .then(u => u)
    .catch(e => console.log('error: ', e));

  const getTeamSession = async () => {
    const team = await models.Team.findById(userSession.teamSession)
      .then(t => t)
      .catch(e => console.log('e: ', e));
    return team;
  };

  const teamSession = await getTeamSession()
    .then(u => u)
    .catch(e => console.log('error: ', e));

  const getProjectSession = async () => {
    const project = await models.Project.findById(userSession.projectSession)
      .then(p => p)
      .catch(e => console.log('error: ', e));
    return project;
  };

  const projectSession = await getProjectSession()
    .then(u => u)
    .catch(e => console.log('error: ', e));

  return {
    // todo: rename session to current. ie. currentUser, currentTeam, currentProject
    req: d.request,
    models,
    userSession,
    teamSession,
    projectSession,
    postSession: 'post',
  };
}

const gqlserver = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
});

gqlserver.start();

export default gqlserver;
