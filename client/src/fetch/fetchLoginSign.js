export default async function fetchLoginSign(query) {
  const url = `/loginsign`;
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };
  const res = await fetch(url, opts);
  const data = await res.json();
  return data;
}
