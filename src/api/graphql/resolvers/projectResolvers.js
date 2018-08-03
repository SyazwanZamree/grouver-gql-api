const projectResolvers = {
  Query: {
    getProjects: async (parent, args, { models }) => {
      const projects = await models.Project.find()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return projects;
    },
    getProject: async (parent, { id }, { models }) => {
      if (!(await models.Project.findById(id))) throw new Error('no such id in db');

      const project = await models.Project.findById(id)
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return project;
    },
  },
  Mutation: {
    createProject: async (parent, { input }, { models }) => {
      const { displayName: inputDisplayName } = input;

      if ((await models.Project.find({ displayName: inputDisplayName })).length) throw new Error('taken displayName');

      const project = new models.Project(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      return project;
    },
    updateProject: async (parent, { id, input }, { models }) => {
      if (!(await models.Project.findById(id))) throw new Error('no such id in db');

      const { displayName: inputDisplayName } = input;
      const takenProps = await models.Project.find({
        $and: [{ displayName: inputDisplayName }, { $nor: [await models.Project.findById(id)] }],
      });

      if (takenProps.length) throw new Error('display name is taken');

      const checkError = (e) => {
        if (e) throw new Error('cannot update team');
      };

      const project = await models.Project.findByIdAndUpdate(
        id,
        { $set: input },
        e => checkError(e),
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return project;
    },
    deleteProject: async (parent, { id }, { models }) => {
      if (!(await models.Project.findById(id))) throw new Error('no such id in db');

      const project = await models.Project.findByIdAndRemove(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return project;
    },
  },
};

export default projectResolvers;
