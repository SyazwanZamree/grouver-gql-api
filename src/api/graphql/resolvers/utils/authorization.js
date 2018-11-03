export function checkUserAuthorization(userSession, projectSession, model) {
  const usersProjectSession = JSON.stringify(userSession.projectSession);
  const projectSessionId = JSON.stringify(projectSession.id);
  const modelProject = JSON.stringify(model.project);
  const isUserAuthorized = (usersProjectSession === projectSessionId)
    && (usersProjectSession === modelProject);

  if (!isUserAuthorized) throw new Error('unauthorized, not sign in');
  console.log('signed in, authorized');
}

export function checkPostCreator(userSession, post) {
  const isUserCreator = JSON.stringify(userSession.id) === JSON.stringify(post.createdBy);
  if (isUserCreator === false) throw new Error('user is not post creator');
  console.log('user is post creator, authorized');
}

export default { checkUserAuthorization, checkPostCreator };
