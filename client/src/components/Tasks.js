import React, { useEffect, useState } from 'react';
import '../css/tasks.css';
import { getTasks } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import checkCookieExist from '../modules/checkCookieExist';
import getCookie from '../modules/getCookie';
import DisplayTasks from './sub/DisplayTasks';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);
  const [hideTasks, setHideTasks] = useState(false);
  const [hideOtherTasks, setHideOtherTasks] = useState(false);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const uname = getCookie('taskjiausername');
    if (!uname)
      alert('Error: no setting ratings allowed.\nTry logging in again.');
    setUsername(uname);
    checkCookieExist();
    async function fetch() {
      const query = getTasks();
      const data = await fetchGraphql(query);
      sortTasks(data.data.tasks, uname);
    }
    fetch();
  }, []);

  const sortTasks = (arr, uname) => {
    let users = [...tasks];
    let others = [...otherTasks];
    arr.forEach((a) => {
      if (a.assignTo.username === uname) users.push(a);
      else others.push(a);
    });
    setTasks(users);
    setOtherTasks(others);
  };

  return (
    <>
      <button onClick={() => setHideOtherTasks(!hideOtherTasks)}>
        Your Tasks
      </button>
      <button onClick={() => setHideTasks(!hideTasks)}>Others Tasks</button>
      {!hideTasks &&
        (tasks.length !== 0 ? (
          <DisplayTasks
            tasks={tasks}
            setTasks={setTasks}
            username={username}
          ></DisplayTasks>
        ) : (
          <p>You have no Tasks</p>
        ))}
      {!hideOtherTasks && (
        <DisplayTasks
          tasks={otherTasks}
          setTasks={setOtherTasks}
          username={username}
        ></DisplayTasks>
      )}
    </>
  );
}
