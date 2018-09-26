import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/index';
import typeDefs from './schemas/index';
import models from './../database/models/index';

const context = d => ({
  models,
  req: d.request,
  db: 'this is db setup',
});

const gqlserver = new GraphQLServer({
  typeDefs,
  resolvers,
  context,
});

gqlserver.start();

export default gqlserver;
