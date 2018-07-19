import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/resolver';

const gqlserver = new GraphQLServer({
  typeDefs: 'src/api/graphql/schemas/schema.graphql',
  resolvers,
});

// only start this when localhost:8000/api/gqlserver is accessed
gqlserver.start(() => console.log('gql server is running'));

export default gqlserver;
