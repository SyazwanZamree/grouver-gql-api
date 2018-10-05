import { GraphQLServer } from 'graphql-yoga';
import jwt from 'jsonwebtoken';

import resolvers from './resolvers/index';
import typeDefs from './schemas/index';
import models from './../database/models/index';

async function context(d) {
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

  const {
    authorization,
  } = d.request.headers;
  const token = await authorization ? authorization.split('Bearer ')[1] : undefined;
  const userSession = await getUserSession(token)
    .then(u => u)
    .catch(e => console.log('error: ', e));

  return {
    req: d.request,
    models,
    userSession,
    teamSession: userSession.teamSession,
    projectSession: 'project',
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
