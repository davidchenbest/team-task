import React, { useState, useEffect } from 'react';
import { getUsers } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import checkCookieExist from '../modules/checkCookieExist';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    checkCookieExist();
    const query = getUsers();
    fetchGraphql(query).then((data) => setUsers(data.data.users));
  }, []);

  return (
    <div>
      {users.map((user, i) => (
        <div key={i}>
          <p>{user.id}</p>
          <p>{user.username}</p>
          <p>
            {user.first} {user.last}
          </p>
          <p>{user.createdDate}</p>
        </div>
      ))}
    </div>
  );
}
