// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the session storage
export const getDetails = () => {
  return sessionStorage.getItem('details') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('details');
  sessionStorage.removeItem('user');
}

// set the token and user from the session storage
export const setUserSession = (details, user) => {
  sessionStorage.setItem('details', details);
  sessionStorage.setItem('user', JSON.stringify(user));
}

// set the token and user from the session storage
export const setMatches = (matches) => {
  sessionStorage.setItem('matches', matches);
}

// return the token from the session storage
export const getMatches = () => {
  return sessionStorage.getItem('matches') || null;
}

// set the token and user from the session storage
export const setTeams = (teams) => {
  sessionStorage.setItem('teams', teams);
}

// return the token from the session storage
export const getTeams = () => {
  return sessionStorage.getItem('teams') || null;
}