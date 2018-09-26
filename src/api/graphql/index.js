import { GraphQLServer } from 'graphql-yoga';
import jwt from 'jsonwebtoken';

import resolvers from './resolvers/index';
import typeDefs from './schemas/index';
import models from './../database/models/index';

function context(d) {
  const {
    authorization,
  } = d.request.headers;

  const token = authorization ? authorization.split('Bearer ')[1] : undefined;
  if (token !== undefined) {
    jwt.verify(token, 'secretTest', (err, result) => {
      if (err) console.log('err: ', err);
      console.log('result: ', result.id);
    });
  } else {
    console.log('token undefined');
  }

  return {
    models,
    req: d.request,
    authorization,
    token,
    db: 'this is db setup',
  };
}

const gqlserver = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
});

gqlserver.start();

export default gqlserver;
