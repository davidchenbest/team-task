import React, { useState } from 'react';
import { login } from '../queries/graphqlQuery';
import fetchLoginSign from '../fetch/fetchLoginSign';
import expireTime from '../modules/expireTime';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0)
      return setError('Incomplete');
    const query = login(email, password);
    const data = await fetchLoginSign(query);

    const { token, error } = data.data.login;
    if (token) {
      document.cookie = `taskjia=${token};${expireTime(60 * 60)}`;
      return window.location.assign('/');
    }
    setError(error);
  };

  //if token set: login auto

  return (
    <form onSubmit={(e) => submit(e)}>
      <input
        type="text"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p>{error}</p>}
      <input type="submit" />
    </form>
  );
}
