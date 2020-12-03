import React, { useState, useEffect } from 'react';
import { getUsers } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import getCookie from '../modules/getCookie';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const cookieToken = getCookie('taskjia');
    if (!cookieToken) return window.location.assign('/login');
    const query = getUsers();
    fetchGraphql(query, cookieToken).then((data) => setUsers(data.data.users));
  }, []);

  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>
          <p>{user.id}</p>
          <p>{user.email}</p>
          <p>
            {user.first} {user.last}
          </p>
          <p>{user.createdDate}</p>
        </div>
      ))}
    </div>
  );
}
