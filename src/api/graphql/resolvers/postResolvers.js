import { GraphQLScalarType } from 'graphql';

function checkUserAuthorization(userSession, projectSession, post) {
  const usersProjectSession = JSON.stringify(userSession.projectSession);
  const projectSessionId = JSON.stringify(projectSession.id);
  const postProject = JSON.stringify(post.project);
  const isUserAuthorized = (usersProjectSession === projectSessionId)
    && (usersProjectSession === postProject);

  if (isUserAuthorized === false && !userSession.invalidToken) throw new Error('unauthorized, not sign in');
  console.log('signed in, authorized');
}

const postResolvers = {
  Query: {
    getPosts: async (parent, args, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const posts = await models.Post.find({
        _id: { $in: projectSession.postList },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return posts;
    },
    getPost: async (parent, args, { models, userSession, projectSession }) => {
      console.log('models: ', models);
      console.log('userSession: ', userSession);
      console.log('projectSession: ', projectSession);
    },
  },
  Mutation: {
    applausePost: async (parent, { id }, { models, userSession, projectSession }) => {
      const post = await models.Post.findById(id);
      checkUserAuthorization(userSession, projectSession, post);

      const applauderIndex = post.applaudedBy.indexOf(userSession.id);
      if (applauderIndex > -1) throw new Error('user already aplause');

      post.applause += 1;
      post.applaudedBy = post.applaudedBy.concat(userSession.id);

      post.save()
        .then(d => d)
        .catch(e => console.log('e', e));

      return post;
    },
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: ' date and time, represented as an ISO-8601 string',
    serialize: value => value.toISOString(),
    parseValue: value => new Date(value),
    parseLiteral: ast => new Date(ast.value),
  }),
  Post: {
    __resolveType: async (parent) => {
      if (parent.assignedTo) {
        console.log('task');
        return 'Task';
      }

      if (parent.replies) {
        console.log('discussion');
        return 'Discussion';
      }

      if (parent.parentPost) {
        console.log('comment');
        return 'Comment';
      }

      if (parent.parentComment) {
        console.log('reply');
        return 'Reply';
      }

      return null;
    },
  },
};

export default postResolvers;
