const taskResolvers = {
  Query: {
    getTasks: async (parent, args, { models, req }) => {
      console.log('>>>>>: ', req.session);
      const tasks = await models.Task.find()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return tasks;
    },
    getTask: async (parent, { id }, { models }) => {
      if (!(await models.Task.findById(id))) throw new Error('no such id in db');

      const task = await models.Task.findById(id)
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return task;
    },
  },
  Mutation: {
    createTask: async (parent, { input }, { models }) => {
      const task = new models.Task(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      return task;
    },
    updateTask: async (parent, { id, input }, { models }) => {
      if (!(await models.Task.findById(id))) throw new Error('no such id in db');

      const checkError = (e) => {
        if (e) throw new Error('cannot update team');
      };

      const task = await models.Task.findByIdAndUpdate(
        id,
        { $set: input },
        e => checkError(e),
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return task;
    },
    deleteTask: async (parent, { id }, { models }) => {
      if (!(await models.Task.findById(id))) throw new Error('no such id in db');

      const task = await models.Task.findByIdAndRemove(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return task;
    },
  },
};

export default taskResolvers;
