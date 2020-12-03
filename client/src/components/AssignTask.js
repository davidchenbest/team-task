import React, { useEffect, useState } from 'react';
import { getUsersIdUsername, addTask } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import checkCookieExist from '../modules/checkCookieExist';
import getCookie from '../modules/getCookie';
import Stars from './sub/Stars';

export default function AssignTask() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(0);
  const [error, setError] = useState(false);
  const [assignBy, setAssignBy] = useState('');

  useEffect(() => {
    checkCookieExist();
    async function fetch() {
      const query = getUsersIdUsername();
      const data = await fetchGraphql(query);
      setUsers(data.data.usersIdUsername);
    }
    fetch();
    setAssignBy(getCookie('taskjiaid'));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!users || !name || !difficulty || !assignBy)
      return setError('Incomplete');
    const selected = document.querySelector('option:checked ');
    const query = addTask(selected.dataset.id, assignBy, name, difficulty);
    const data = await fetchGraphql(query);
    if (data.errors) return setError(data.errors[0].message);
    if (data.data.addTask.name === 'success') {
      return setError(data.data.addTask.name);
    }
  };

  return (
    <form onSubmit={(e) => submit(e)}>
      <select>
        {users.map((user) => (
          <option key={user.id} data-id={user.id}>
            {user.username}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <Stars
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        id=""
        index=""
      ></Stars>
      <input type="submit" />
      {error && <p>{error}</p>}
    </form>
  );
}
