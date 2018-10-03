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
          if (e) throw new Error('cannot update user');
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
};

export default teamResolvers;
