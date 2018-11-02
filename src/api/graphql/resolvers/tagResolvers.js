import checkUserAuthentication from './utils/authentication';
// import { checkUserAuthorization } from './utils/authorization';

const tagResolvers = {
  Query: {
    getTags: async (parent, args, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const tags = await models.Tag.find({
        _id: { $in: projectSession.tags },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return tags;
    },
    getTag: async (parent, { id }, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const tag = await models.Tag.findById(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return tag;
    },
    searchTag: async (parent, { input }, { models, userSession, projectSession }) => {
      console.log('input: ', input);
      console.log('models: ', models);
      console.log('userSession: ', userSession);
      console.log('projectSession: ', projectSession);
    },
  },
  Mutation: {
    createTag: async (parent, { body, postIdInput }, { models, userSession, projectSession }) => {
      checkUserAuthentication(userSession, projectSession);

      const createdTag = await models.Tag.find({
        body,
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      if (createdTag.length) throw new Error('tag already created');

      const tag = await new models.Tag({ body });
      tag.project = projectSession.id;
      tag.posts = [];
      if (postIdInput) {
        tag.posts = tag.posts.concat(postIdInput);
      }
      tag.save()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      await models.Project.findByIdAndUpdate(
        projectSession.id,
        { tags: await projectSession.tags.concat(tag.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update project');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      if (postIdInput) {
        const post = await models.Post.findById(postIdInput);

        await models.Post.findByIdAndUpdate(
          postIdInput,
          { tags: await post.tags.concat(tag.id) },
          { new: true },
          (e) => {
            if (e) throw new Error('cannot update post');
          },
        )
          .then(d => d)
          .catch(e => console.log('e: ', e));
      }

      return tag;
    },
    assignPostToTag: async (parent,
      { TagIdInput, PostIdInput },
      { models, userSession, projectSession },
    ) => {
      console.log('TagIdInput: ', TagIdInput);
      console.log('PostIdInput: ', PostIdInput);
      console.log('models: ', models);
      console.log('userSession: ', userSession);
      console.log('projectSession: ', projectSession);
    },
  },
  Tag: {
    posts: (parent, args, { models }) => {
      const posts = [];
      parent.posts.forEach((e) => {
        const post = models.Post.findById(e);
        posts.push(post);
      });
      return posts;
    },
    project: (parent, args, { models }) => {
      const project = models.Project.findById(parent.project);
      return project;
    },
  },
};

export default tagResolvers;
