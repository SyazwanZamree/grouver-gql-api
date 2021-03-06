const projectResolvers = {
  Query: {
    getProjects: async (parent, args, { models, userSession, teamSession }) => {
      if (!teamSession || userSession.invalidToken) throw new Error('unauthorized');

      const projects = await models.Project.find({
        _id: { $in: teamSession.projectList },
      })
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return projects;
    },
  },
  Mutation: {
    projectLogin: async (parent, { id }, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');
      if (userSession.projects.indexOf(id) <= -1) throw new Error('unauthorized: not users project');

      const project = await models.Project.findById(id)
        .then(d => d)
        .catch(e => console.log('e: ', e));

      const user = await models.User.findByIdAndUpdate(
        userSession.id,
        { projectSession: project.id },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return user;
    },
    projectLogout: async (parent, args, { models, userSession, projectSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');
      if (!projectSession) throw new Error('no project logged in');

      const user = await models.User.findByIdAndUpdate(
        userSession.id,
        { projectSession: null },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return user;
    },
    addProjectToUser: async (parent, { id }, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = projectSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const user = await models.User.findById(id);
      let update;

      if (user.projects.indexOf(projectSession.id) <= -1) {
        update = { projects: user.projects.concat(projectSession.id) };
      }

      const updatedUser = await models.User.findByIdAndUpdate(
        id,
        update,
        (e) => {
          if (e) throw new Error('cannot update user');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return updatedUser;
    },
    removeProjectFromUser: async (parent, { id }, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = projectSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const user = await models.User.findById(id);
      const projectIndex = user.projects.indexOf(projectSession.id);

      if (projectIndex <= -1) throw new Error('user not in project');

      if (JSON.stringify(projectSession.id) === JSON.stringify(user.projectSession)) {
        user.projectSession = null;
      }

      user.projects.splice(projectIndex, 1);
      user.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      return user;
    },
    createProject: async (parent, { input }, { models, userSession, teamSession }) => {
      if (!teamSession || userSession.invalidToken) throw new Error('unauthorized');

      const { displayName: inputDisplayName } = input;

      if ((await models.Project.find({ displayName: inputDisplayName })).length) throw new Error('taken displayName');

      const project = await new models.Project(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      project.team = teamSession.id;
      project.adminList = project.adminList.concat(userSession.id);

      project.save()
        .then(d => d)
        .catch(e => console.log('e: ', e));

      await models.Team.findByIdAndUpdate(
        teamSession.id,
        { projectList: await teamSession.projectList.concat(project.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));


      await models.User.findByIdAndUpdate(
        userSession.id,
        { projects: await userSession.projects.concat(project.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return project;
    },
    updateProject: async (parent, { input }, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = projectSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const { displayName: inputDisplayName } = input;
      const takenProps = await models.Project.find({
        $and: [{ displayName: inputDisplayName },
          { $nor: [await models.Project.findById(projectSession.id)] }],
      });

      if (takenProps.length) throw new Error('display name is taken');

      const project = await models.Project.findByIdAndUpdate(
        projectSession.id,
        { $set: input },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return project;
    },
    deleteProject: async (parent, args, { models, userSession, projectSession }) => {
      if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = projectSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const project = await models.Project.findByIdAndRemove(projectSession.id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return project;
    },
  },
  Project: {
    id: parent => parent.id,
    team: (parent, args, { models }) => {
      const team = models.Team.findById(parent.team);
      return team;
    },
    adminList: (parent, args, { models }) => {
      const adminList = [];
      parent.adminList.forEach((e) => {
        const user = models.User.findById(e);
        adminList.push(user);
      });
      return adminList;
    },
    postList: (parent, args, { models }) => {
      const postList = [];
      parent.postList.forEach((e) => {
        const post = models.Post.findById(e);
        postList.push(post);
      });
      return postList;
    },
    tags: (parent, args, { models }) => {
      const tags = [];
      parent.tags.forEach((e) => {
        const tag = models.Tag.findById(e);
        tags.push(tag);
      });
      return tags;
    },
  },
};

export default projectResolvers;
