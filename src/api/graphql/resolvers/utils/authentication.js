export default function checkUserAuthentication(userSession, projectSession) {
  if (!projectSession || userSession.invalidToken) throw new Error('unauthorized');
  console.log('authenticated');
}
