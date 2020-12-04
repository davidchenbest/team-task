import React, { useEffect, useState } from 'react';
import '../css/tasks.css';
import { getTasks } from '../queries/graphqlQuery';
import fetchGraphql from '../fetch/fetchGraphql';
import checkCookieExist from '../modules/checkCookieExist';
import Stars from './sub/Stars';
import StaticStars from './sub/StaticStars';
import DeleteTask from './sub/DeleteTask';
import GetUserTask from './sub/GetUserTask';
import getCookie from '../modules/getCookie';
import { updateRated } from '../queries/graphqlQuery';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
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
      setTasks(data.data.tasks);
    }
    fetch();
  }, []);

  const setRatedDifficulty = async (difficulty, index, id) => {
    if (difficulty === tasks[index].ratedDifficulty) return;
    let arr = [...tasks];
    arr[index].ratedDifficulty = difficulty;
    setTasks(arr);
    const query = updateRated(difficulty, id);
    const data = await fetchGraphql(query);
    if (!data.data.updateRated.ratedDifficulty === 1)
      alert('there was an error');
  };

  const deleteCard = (index) => {
    let arr = [...tasks];
    arr.splice(index, 1);
    setTasks(arr);
  };

  function displayCurrentUserRating(task, index) {
    return task.assignTo.username === username ? (
      <Stars
        index={index}
        id={task.id}
        difficulty={task.ratedDifficulty > 0 ? task.ratedDifficulty : 0}
        setDifficulty={setRatedDifficulty}
      ></Stars>
    ) : (
      displayUserRating(task.ratedDifficulty)
    );
  }

  function displayUserRating(rate) {
    return rate ? <StaticStars difficulty={rate}></StaticStars> : 'Waiting';
  }

  function highlightUserCards(uname) {
    if (uname === username) return 'userCard';
  }

  return (
    <>
      <GetUserTask tasks={tasks} setTasks={setTasks}></GetUserTask>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          data-id={task.id}
          className={`eachTask ${highlightUserCards(task.assignTo.username)}`}
        >
          <DeleteTask
            id={task.id}
            index={index}
            deleteCard={deleteCard}
          ></DeleteTask>
          <div>{task.name}</div>
          <div>To: {task.assignTo.username}</div>
          <div>By: {task.assignBy.username}</div>
          <div>
            Rated: <StaticStars difficulty={task.difficulty}></StaticStars>
          </div>
          <div>
            User Rated:
            {displayCurrentUserRating(task, index)}
          </div>
        </div>
      ))}
    </>
  );
}
