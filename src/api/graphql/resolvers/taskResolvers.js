const taskResolvers = {
  Mutation: {
    createTask: async (parent, { input }, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const task = await new models.Post(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      const project = await models.Project.findByIdAndUpdate(
        projectSession.id,
        { postList: await projectSession.postList.concat(task.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      console.log('project: ', project);

      task.createdBy = userSession.id;
      task.project = projectSession.id;

      task.save()
        .then(d => d)
        .catch(e => console.log('error: ', e));

      return task;
    },
    updateTask: async (parent, { id, input }, { models, userSession, projectSession }) => {
      const usersProjectSession = JSON.stringify(userSession.projectSession);
      const projectSessionId = JSON.stringify(projectSession.id);
      const task = await models.Post.findById(id);
      const taskProject = JSON.stringify(task.project);
      const isUserAuthorized = (usersProjectSession === projectSessionId)
        && (usersProjectSession === taskProject);
      const isUserCreator = JSON.stringify(userSession.id) === JSON.stringify(task.createdBy);

      if (isUserAuthorized === false && !userSession.invalidToken) throw new Error('unauthorized, not sign in');
      if (isUserCreator === false) throw new Error('user is not post creator');

      const updatedTask = await models.Post.findByIdAndUpdate(
        id,
        { $set: input },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedTask;
    },
    removeTask: async (parent, { id }, { models, userSession, projectSession }) => {
      const usersProjectSession = JSON.stringify(userSession.projectSession);
      const projectSessionId = JSON.stringify(projectSession.id);
      const task = await models.Post.findById(id);
      const taskProject = JSON.stringify(task.project);
      const isUserAuthorized = (usersProjectSession === projectSessionId)
        && (usersProjectSession === taskProject);
      const isUserCreator = JSON.stringify(userSession.id) === JSON.stringify(task.createdBy);

      if (isUserAuthorized === false && !userSession.invalidToken) throw new Error('unauthorized, not sign in');
      if (isUserCreator === false) throw new Error('user is not post creator');

      const removedTask = await models.Post.findByIdAndRemove(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return removedTask;
    },
  },
  Task: {
    createdBy: (parent, args, { models }) => {
      const user = models.User.findById(parent.createdBy);
      return user;
    },
    project: (parent, args, { models }) => {
      const project = models.Project.findById(parent.project);
      return project;
    },
    comments: (parent, args, { models }) => {
      const comments = [];
      parent.comments.forEach((e) => {
        const comment = models.Post.findById(e);
        comments.push(comment);
      });
      return comments;
    },
    assignedTo: (parent, args, { models }) => {
      const users = [];
      parent.assignedTo.forEach((e) => {
        const user = models.User.findById(e);
        users.push(user);
      });
      return users;
    },
  },
};

export default taskResolvers;
