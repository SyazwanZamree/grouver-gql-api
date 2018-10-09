const teamResolvers = {
  Query: {
    getTeams: async (parent, args, { models, userSession }) => {
      // this is not needed. user.teams can be queried from user.
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

      const teams = await models.Team.find({
        _id: { $in: userSession.team },
      })
        .then(d => d)
        .catch(e => console.log('e', e));

      return teams;
    },
  },
  Mutation: {
    teamSignIn: async (parent, { id }, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');
      if (userSession.team.indexOf(id) <= -1) throw new Error('unauthorized: not users team');

      const team = await models.Team.findById(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      const user = await models.User.findByIdAndUpdate(
        userSession.id,
        { teamSession: team.id },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return user;
    },
    teamLogOut: async (parent, args, { models, teamSession, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');
      if (!teamSession) throw new Error('no team is signed in');

      const user = await models.User.findByIdAndUpdate(
        userSession.id,
        { teamSession: null },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return user;
    },
    createTeam: async (parent, { input }, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

      const { displayName: inputDisplayName } = input;

      if ((await models.Team.find({ displayName: inputDisplayName })).length) throw new Error('taken displayName');

      const team = await new models.Team(input)
        .save()
        .then(d => d)
        .catch(e => console.log('error', e));

      team.adminList = team.adminList.concat(userSession.id);
      team.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      await models.User.findByIdAndUpdate(
        userSession.id,
        { team: await userSession.team.concat(team.id) },
        { new: true },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e: ', e));

      return team;
    },
    updateTeam: async (parent, { input }, { models, userSession, teamSession }) => {
      if (!teamSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = teamSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const { displayName: inputDisplayName } = input;
      const takenProps = await models.Team.find({
        $and: [{ displayName: inputDisplayName },
          { $nor: [await models.Team.findById(teamSession.id)] }],
      });

      if (takenProps.length) throw new Error('display name is taken');

      const team = await models.Team.findByIdAndUpdate(
        teamSession.id,
        { $set: input },
        (e) => {
          if (e) throw new Error('cannot update team');
        },
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return team;
    },
    addTeamsUser: async (parent, { id }, { models, userSession, teamSession }) => {
      if (!teamSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = teamSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const user = await models.User.findById(id);
      let update;

      if (user.team.indexOf(teamSession.id) <= -1) {
        update = { team: user.team.concat(teamSession.id) };
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
    removeTeamsUser: async (parent, { id }, { models, userSession, teamSession }) => {
      if (!teamSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = teamSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const user = await models.User.findById(id);
      const teamIndex = user.team.indexOf(teamSession.id);

      if (teamIndex <= -1) throw new Error('user not in team');

      user.team.splice(teamIndex, 1);
      user.save()
        .then(d => d)
        .catch(e => console.log('error', e));

      return user;
    },
    deleteTeam: async (parent, args, { models, userSession, teamSession }) => {
      if (!teamSession || userSession.invalidToken) throw new Error('unauthorized');

      const isUserAdmin = teamSession.adminList.indexOf(userSession.id);
      if (isUserAdmin <= -1) throw new Error('unauthorized, not an admin');

      const team = await models.Team.findByIdAndRemove(teamSession.id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return team;
    },
  },
  Team: {
    memberList: (parent, args, { models }) => {
      const memberList = [];
      parent.memberList.forEach((e) => {
        const user = models.User.findById(e);
        memberList.push(user);
      });
      return memberList;
    },
    adminList: (parent, args, { models }) => {
      const adminList = [];
      parent.adminList.forEach((e) => {
        const user = models.User.findById(e);
        adminList.push(user);
      });
      return adminList;
    },
  },
};

export default teamResolvers;
