import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/nav.css';
import getCookie from '../../modules/getCookie';

export default function Nav() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const cookieToken = getCookie('taskjia');
    if (cookieToken) setLogged(true);
  }, [logged]);

  return (
    <nav>
      <ul>
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        {logged ? (
          <>
            <li>
              <NavLink exact activeClassName="active" to="/tasks">
                Tasks
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/users">
                Users
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/assigntask">
                Assign
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/logout">
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" to="/signup">
              Signup
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
