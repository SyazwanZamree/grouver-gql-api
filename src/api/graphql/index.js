import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/resolver';
import models from './../database/models/index';

const context = {
  models,
  db: 'this is db setup',
};

const gqlserver = new GraphQLServer({
  // use mergeTypes(typesArray) from merge-graphql-schemas
  // to merge modular schema types.
  typeDefs: 'src/api/graphql/schemas/schema.graphql',
  // use mergeResolvers(resolversArray) from merge-graphql-schemas
  // to merge modular resolvers.
  // see https://github.com/prismagraphql/graphql-yoga/tree/master/examples/modular-resolvers
  // for more infos
  resolvers,
  context,
});

gqlserver.start();

export default gqlserver;
