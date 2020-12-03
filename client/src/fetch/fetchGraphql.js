export default async function fetchGraphql(query, jwt) {
  const url = `/graphql`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({ query }),
  };
  const res = await fetch(url, opts);
  const data = await res.json();
  return data;
}
