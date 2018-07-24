import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/resolver';

const gqlserver = new GraphQLServer({
  // use mergeTypes(typesArray) from merge-graphql-schemas
  // to merge modular schema types.
  typeDefs: 'src/api/graphql/schemas/schema.graphql',
  // use mergeResolvers(resolversArray) from merge-graphql-schemas
  // to merge modular resolvers.
  // see https://github.com/prismagraphql/graphql-yoga/tree/master/examples/modular-resolvers
  // for more infos
  resolvers,
});

gqlserver.start();

export default gqlserver;
