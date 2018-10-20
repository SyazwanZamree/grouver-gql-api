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
          if (e) throw new Error('cannot update project');
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
          if (e) throw new Error('cannot update task');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedTask;
    },
    assignTaskDueDate: async (parent, { id, dueDate }, { models, userSession, projectSession }) => {
      const task = await models.Post.findById(id);
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);

      const updatedTask = await models.Post.findByIdAndUpdate(
        id,
        { dueDate },
        (e) => {
          if (e) throw new Error('cannot update task');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedTask;
    },
    markTaskStatus: async (parent, { id, status }, { models, userSession, projectSession }) => {
      const task = await models.Post.findById(id);
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);

      const updatedTask = await models.Post.findByIdAndUpdate(
        id,
        { status },
        (e) => {
          if (e) throw new Error('cannot update task');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedTask;
    },
    assignTaskDifficultyLevel: async (parent,
      { id, difficultyLevel },
      { models, userSession, projectSession },
    ) => {
      const task = await models.Post.findById(id);
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);

      const updatedTask = await models.Post.findByIdAndUpdate(
        id,
        { difficultyLevel },
        (e) => {
          if (e) throw new Error('cannot update task');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return updatedTask;
    },
    addTaskTag: async () => {
      console.log('addTaskTag');
    },
    assignTaskToUsers: async (parent,
      { taskInput, userInput },
      { models, userSession, projectSession },
    ) => {
      const task = await models.Post.findById(taskInput.id);
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);
      const authUsers = [];
      const newUsers = [];
      const assignUsers = [];
      const users = await models.User.find({
        _id: { $in: userInput.id },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      // TODO: maybe we can use filter here instead of creating and storing element into new arrays
      users.forEach((e) => {
        const isUserInProject = e.projects.indexOf(projectSession.id);
        if (isUserInProject > -1) authUsers.push(e);
      });

      authUsers.forEach((e) => {
        const isNewlyAssignedTask = e.tasksAssigned.indexOf(taskInput.id);
        if (isNewlyAssignedTask <= -1) {
          newUsers.push(e.id);
          models.User.findByIdAndUpdate(
            e.id,
            { tasksAssigned: e.tasksAssigned.concat(taskInput.id) },
            { new: true },
            (er) => {
              if (er) throw new Error('cannot update user');
            },
          )
            .then(d => d)
            .catch(er => console.log('e: ', er));
        }
      });

      newUsers.forEach((e) => {
        const isUserAssigned = task.assignedTo.indexOf(e);
        if (isUserAssigned <= -1) assignUsers.push(e);
      });

      task.assignedTo = task.assignedTo.concat(assignUsers);
      task.save()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return task;
    },
    addCommentToTask: async (parent, { id, input }, { models, userSession, projectSession }) => {
      const task = await models.Post.findById(id);
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);

      const comment = await new models.Post(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      comment.createdBy = userSession.id;
      comment.postType = 'COMMENT';
      comment.parentPost = task.id;
      comment.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      models.Post.findByIdAndUpdate(
        task.id,
        { comments: task.comments.concat(comment.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update post');
        },
      )
        .then(d => d)
        .catch(er => console.log('e: ', er));

      return comment;
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
