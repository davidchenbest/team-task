import getCookie from './getCookie';
const checkCookieExist = () => {
  const cookieToken = getCookie('taskjia');
  if (!cookieToken) return window.location.assign('/login');
};

export default checkCookieExist;
