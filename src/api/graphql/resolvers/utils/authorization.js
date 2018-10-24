export function checkUserAuthorization(userSession, projectSession, task) {
  const usersProjectSession = JSON.stringify(userSession.projectSession);
  const projectSessionId = JSON.stringify(projectSession.id);
  const taskProject = JSON.stringify(task.project);
  const isUserAuthorized = (usersProjectSession === projectSessionId)
    && (usersProjectSession === taskProject);

  if (isUserAuthorized === false && !userSession.invalidToken) throw new Error('unauthorized, not sign in');
  console.log('signed in, authorized');
}

export function checkPostCreator(userSession, task) {
  const isUserCreator = JSON.stringify(userSession.id) === JSON.stringify(task.createdBy);
  if (isUserCreator === false) throw new Error('user is not post creator');
  console.log('user is post creator, authorized');
}

export default { checkUserAuthorization, checkPostCreator };
