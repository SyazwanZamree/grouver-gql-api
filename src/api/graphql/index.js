import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/resolver';

const gqlserver = new GraphQLServer({
  typeDefs: 'src/api/graphql/schemas/schema.graphql',
  resolvers,
});

gqlserver.start(() => console.log('gql server is running'));

export default gqlserver;
