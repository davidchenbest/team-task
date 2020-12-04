import React, { useState } from 'react';
import { signup } from '../queries/graphqlQuery';
import fetchLoginSign from '../fetch/fetchLoginSign';

function inputs() {
  const input = document.querySelectorAll('input:not(:last-child)');
  for (let i = 0; i < input.length; i++) {
    if (input[i].value.trim().length === 0) return false;
  }
  return true;
}

function passwordMatch() {
  const passwords = document.querySelectorAll('input[type=password]');
  if (passwords[0].value === passwords[1].value) return true;
  return false;
}

export default function Signup() {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const filled = inputs();
    if (!filled) return setError('Incomplete');
    const passMatch = passwordMatch();
    if (!passMatch) return setError('Password does not match');
    let query = signup(username, first, last, password);
    let data = await fetchLoginSign(query);
    console.log(data);
    if (data.data.signup.error === 'signup success') {
      return window.location.assign('/login');
    }
    setError(data.data.signup.error);
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        onChange={(e) => setFirst(e.target.value)}
        placeholder="First"
      />
      <input
        type="text"
        onChange={(e) => setLast(e.target.value)}
        placeholder="Last"
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <input type="password" placeholder="Confirm Password" />
      {error && <p>{error}</p>}
      <input type="submit" />
    </form>
  );
}
