export default (timeLimit) => {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + 1000 * timeLimit;
  now.setTime(expireTime);
  return `expires=${now.toGMTString()}`;
};
