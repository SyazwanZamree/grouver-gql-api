import checkUserAuthentication from './utils/authentication';

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
        .then((d) => {
          if (JSON.stringify(d.project) !== JSON.stringify(projectSession.id)) {
            throw new Error('unauthorized');
          }
          return d;
        })
        .catch(e => console.log('e', e));

      return tag;
    },
    searchTag: async (parent, { input }, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const results = await models.Tag.find({
        body: {
          $regex: input,
          $options: 'i',
        },
      })
        .then((d) => {
          const authTags = [];
          d.forEach((e) => {
            if (JSON.stringify(e.project) === JSON.stringify(projectSession.id)) {
              authTags.push(e);
            }
          });
          return authTags;
        })
        .catch(e => console.log('e: ', e));

      return results;
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
      { tagIdInput, postIdInput },
      { models, userSession, projectSession },
    ) => {
      checkUserAuthentication(userSession, projectSession);

      const tag = await models.Tag.findById(tagIdInput);
      const post = await models.Post.findById(postIdInput);
      const postIndex = tag.posts.indexOf(postIdInput);

      if (postIndex > -1) throw new Error('post already tagged');

      tag.posts = tag.posts.concat(postIdInput);
      tag.save()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      post.tags = post.tags.concat(tagIdInput);
      post.save()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return tag;
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
