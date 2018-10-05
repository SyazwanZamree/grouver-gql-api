const teamResolvers = {
  Query: {
    getTeams: async (parent, args, { models, userSession }) => {
      if (!userSession || userSession.invalidToken) throw new Error('unauthorized');

      const teams = await models.Team.find({
        _id: { $in: userSession.team },
      })
        .then(d => d)
        .catch(e => console.log('e', e));

      return teams;
    },
    getTeam: async (parent, { id }, { models }) => {
      if (!(await models.Team.findById(id))) throw new Error('no such id in db');
      const team = await models.Team.findById(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return team;
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
    updateTeam: async (parent, { id, input }, { models }) => {
      const { displayName: inputDisplayName } = input;

      if (!(await models.Team.findById(id))) throw new Error('no such id in db');

      const takenProps = await models.Team.find({
        $and: [{ displayName: inputDisplayName }, { $nor: [await models.Team.findById(id)] }],
      });

      if (takenProps.length) throw new Error('display name is taken');

      const checkError = (e) => {
        if (e) throw new Error('cannot update team');
      };

      const team = await models.Team.findByIdAndUpdate(
        id,
        { $set: input },
        e => checkError(e),
      )
        .then(d => d)
        .catch(e => console.log('e', e));

      return team;
    },
    deleteTeam: async (parent, { id }, { models }) => {
      if (!(await models.Team.findById(id))) throw new Error('no such id in db');

      const team = await models.Team.findByIdAndRemove(id)
        .then(d => d)
        .catch(e => console.log('e', e));

      return team;
    },
  },
  // Team: {
  //   user: (parent, args, { models }) => {
  //     const user = parent.
  //   }
  // }
};

export default teamResolvers;
