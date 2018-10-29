import checkUserAuthentication from './utils/authentication';
import { checkUserAuthorization } from './utils/authorization';

const taskResolvers = {
  Mutation: {
    assignTaskDueDate: async (parent, { id, dueDate }, { models, userSession, projectSession }) => {
      const task = await models.Post.findById(id);
      if (task.postType !== 'TASK') throw new Error('Post is not of a task type');
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
      if (status === task.status) throw new Error('cannot reassign');
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);

      let xp;

      const updatedTask = await models.Post.findByIdAndUpdate(
        id,
        { status },
        (e) => {
          if (e) throw new Error('cannot update task');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      const assignedUsers = await models.User.find({
        _id: { $in: task.assignedTo },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      // TODO: xp will be based on task difficultyLevel
      if (task.status === 'DONE') {
        // DONE > IN_PROGRESS -15
        xp = -15;
      } else if (!task.status) {
        // null > DONE +15
        // null > IN_PROGRESS +5
        xp = status === 'DONE' ? 20 : 5;
      } else {
        // IN_PROGRESS > DONE +15
        xp = 15;
      }

      await assignedUsers.forEach((user) => {
        let currentXp = user.experiencePoint;
        models.User.findByIdAndUpdate(
          user.id,
          { experiencePoint: currentXp += xp },
          (e) => {
            if (e) throw new Error('cannot update user point');
          },
        )
          .then(d => d)
          .catch(e => console.log('e', e));
      });

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
    assignTaskToUsers: async (parent,
      { taskIdInput, userIdInput },
      { models, userSession, projectSession },
    ) => {
      const task = await models.Post.findById(taskIdInput.id);
      checkUserAuthentication(userSession, projectSession);
      checkUserAuthorization(userSession, projectSession, task);
      const authUsers = [];
      const newUsers = [];
      const assignUsers = [];
      const users = await models.User.find({
        _id: { $in: userIdInput.id },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      // TODO: maybe we can use filter here instead of creating and storing element into new arrays
      users.forEach((e) => {
        const isUserInProject = e.projects.indexOf(projectSession.id);
        if (isUserInProject > -1) authUsers.push(e);
      });

      authUsers.forEach((e) => {
        const isNewlyAssignedTask = e.postsAssigned.indexOf(taskIdInput.id);
        if (isNewlyAssignedTask <= -1) {
          newUsers.push(e.id);
          models.User.findByIdAndUpdate(
            e.id,
            { postsAssigned: e.postsAssigned.concat(taskIdInput.id) },
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
    assignedTo: (parent, args, { models }) => {
      const users = [];
      parent.assignedTo.forEach((e) => {
        const user = models.User.findById(e);
        users.push(user);
      });
      return users;
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
  },
};

export default taskResolvers;
