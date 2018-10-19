function checkUserAuthentication(userSession, projectSession) {
  if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');
  console.log('authenticated');
}

function checkUserAuthorization(userSession, projectSession, task) {
  const usersProjectSession = JSON.stringify(userSession.projectSession);
  const projectSessionId = JSON.stringify(projectSession.id);
  const taskProject = JSON.stringify(task.project);
  const isUserAuthorized = (usersProjectSession === projectSessionId)
    && (usersProjectSession === taskProject);

  if (isUserAuthorized === false && !userSession.invalidToken) throw new Error('unauthorized, not sign in');
  console.log('signed in, authorized');
}

function checkPostCreator(userSession, task) {
  const isUserCreator = JSON.stringify(userSession.id) === JSON.stringify(task.createdBy);
  if (isUserCreator === false) throw new Error('user is not post creator');
  console.log('user is post creator, authorized');
}

const taskResolvers = {
  Mutation: {
    createTask: async (parent, { input }, { models, userSession, projectSession }) => {
      checkUserAuthentication(userSession, projectSession);

      const task = await new models.Post(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      task.createdBy = userSession.id;
      task.project = projectSession.id;
      task.applause = 0;
      task.postType = 'TASK';
      task.save()
        .then(d => d)
        .catch(e => console.log('error: ', e));

      await models.Project.findByIdAndUpdate(
        projectSession.id,
        { postList: await projectSession.postList.concat(task.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return task;
    },
    updateTask: async (parent, { id, input }, { models, userSession, projectSession }) => {
      const task = await models.Post.findById(id);

      checkUserAuthorization(userSession, projectSession, task);
      checkPostCreator(userSession, task);

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
    assignTaskDueDate: async () => {
      console.log('assignTaskDueDate');
    },
    markTaskStatus: async () => {
      console.log('markTaskStatus');
    },
    updateTaskLevel: async () => {
      console.log('updateTaskLevel');
    },
    addTaskTag: async () => {
      console.log('addTaskTag');
    },
    assignTaskToUsers: async () => {
      console.log('assignTaskToUsers');
    },
    addCommentToTask: async () => {
      console.log('addCommentToTask');
    },
    removeTask: async (parent, { id }, { models, userSession, projectSession }) => {
      const task = await models.Post.findById(id);

      checkUserAuthorization(userSession, projectSession, task);
      checkPostCreator(userSession, task);

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
    applaudedBy: (parent, args, { models }) => {
      const users = [];
      parent.applaudedBy.forEach((e) => {
        const user = models.User.findById(e);
        users.push(user);
      });
      return users;
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
