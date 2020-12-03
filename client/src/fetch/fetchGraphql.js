import getCookie from '../modules/getCookie';
export default async function fetchGraphql(query) {
  const cookieToken = getCookie('taskjia');
  const url = `/graphql`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${cookieToken}`,
    },
    body: JSON.stringify({ query }),
  };
  const res = await fetch(url, opts);
  const data = await res.json();
  return data;
}
