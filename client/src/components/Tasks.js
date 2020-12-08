import React, { useEffect, useState } from 'react';
import '../css/tasks.css';
import { getTasks } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import checkCookieExist from '../modules/checkCookieExist';
import getCookie from '../modules/getCookie';
import DisplayTasks from './sub/DisplayTasks';
import FilterTasks from './sub/filterTasks/FilterTasks';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [assignTasks, setAssignTasks] = useState([]);
  const [otherTasks, setOtherTasks] = useState([]);
  const [hideTasks, setHideTasks] = useState(false);
  const [hideAssignTasks, setHideAssignTasks] = useState(false);
  const [hideOtherTasks, setHideOtherTasks] = useState(true);
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
    let users = [];
    let assign = [];
    let others = [];
    arr.forEach((a) => {
      if (a.assignTo.username === uname) users.push(a);
      else if (a.assignBy.username === uname) assign.push(a);
      else others.push(a);
    });
    setTasks(users);
    setAssignTasks(assign);
    setOtherTasks(others);
  };

  return (
    <div className="taskWrapper">
      <FilterTasks
        tasks={tasks}
        assignTasks={assignTasks}
        otherTasks={otherTasks}
        setTasks={setTasks}
        setAssignTasks={setAssignTasks}
        setOtherTasks={setOtherTasks}
        hideTasks={hideTasks}
        hideAssignTasks={hideAssignTasks}
        hideOtherTasks={hideOtherTasks}
        setHideTasks={setHideTasks}
        setHideAssignTasks={setHideAssignTasks}
        setHideOtherTasks={setHideOtherTasks}
      ></FilterTasks>

      <div className="taskCon">
        {!hideTasks && (
          <>
            <h2>Your Tasks</h2>
            {tasks.length !== 0 ? (
              <DisplayTasks
                tasks={tasks}
                setTasks={setTasks}
                username={username}
              ></DisplayTasks>
            ) : (
              <p>You have no Tasks</p>
            )}
          </>
        )}

        {!hideAssignTasks && (
          <>
            <h2>Assigning Tasks</h2>
            {assignTasks.length !== 0 ? (
              <DisplayTasks
                tasks={assignTasks}
                setTasks={setAssignTasks}
                username={username}
              ></DisplayTasks>
            ) : (
              <p>You have no Assigning Tasks</p>
            )}
          </>
        )}

        {!hideOtherTasks && (
          <>
            <h2>Others</h2>

            <DisplayTasks
              tasks={otherTasks}
              setTasks={setOtherTasks}
              username={username}
            ></DisplayTasks>
          </>
        )}
      </div>
    </div>
  );
}
